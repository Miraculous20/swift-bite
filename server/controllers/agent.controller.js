import AgentModel from '../models/agent.model.js';
import OrderModel from '../models/order.model.js';
import sendEmail from '../config/sendEmail.js';
import agentWelcomeTemplate from '../utils/agentWelcomeTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';

export const registerAgentController = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        const existingAgent = await AgentModel.findOne({ $or: [{ email }, { phone }] });
        if (existingAgent) {
            return res.status(409).json({ success: false, message: "Agent with this email or phone already exists." });
        }
        const newAgent = new AgentModel({ name, email, password, phone });
        await newAgent.save();

        await sendEmail({
            sendTo: email,
            subject: "Welcome to the Swift-Bite Delivery Team!",
            html: agentWelcomeTemplate({ name })
        });

        res.status(201).json({ success: true, message: "Agent registered successfully. Please log in." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during agent registration.", error: error.message });
    }
};

export const loginAgentController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const agent = await AgentModel.findOne({ email }).select('+password');
        if (!agent) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }
        const isMatch = await agent.comparePassword(password); // Assuming you add this method to your model
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const accessToken = generatedAccessToken(agent._id);
        const refreshToken = generatedRefreshToken(agent._id);
        agent.refreshToken = refreshToken;
        await agent.save();

        const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' };
        res.cookie('agentAccessToken', accessToken, cookieOptions);
        
        agent.password = undefined;
        res.status(200).json({ success: true, message: "Agent login successful.", data: agent });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during agent login." });
    }
};

export const getAgentDetailsController = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "Agent details retrieved.", data: req.agent });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};

export const logoutAgentController = async (req, res) => {
    try {
        await AgentModel.findByIdAndUpdate(req.agent._id, { refreshToken: "" });
        const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' };
        res.clearCookie("agentAccessToken", cookieOptions);
        res.status(200).json({ success: true, message: "Agent logged out successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during logout." });
    }
};

export const getAvailableJobsController = async (req, res) => {
    try {
        const jobs = await OrderModel.find({ orderStatus: 'Ready for Pickup', assignedAgentId: null })
            .populate('userId', 'name')
            .populate({
                path: 'deliveryAddress',
                model: 'Address'
            });
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch available jobs." });
    }
};

export const acceptJobController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const agentId = req.agent._id;

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }
        if (order.orderStatus !== 'Ready for Pickup' || order.assignedAgentId) {
            return res.status(409).json({ success: false, message: "Job is no longer available." });
        }

        order.assignedAgentId = agentId;
        order.orderStatus = 'Out for Delivery';
        await order.save();
        
        // In a real app, you would emit a socket event to the user here.
        console.log(`LOG: Notifying user ${order.userId} that their order is now Out for Delivery.`);

        res.status(200).json({ success: true, message: "Job accepted.", data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to accept job." });
    }
};

export const getDeliveryHistoryController = async (req, res) => {
    try {
        const agentId = req.agent._id;
        const history = await OrderModel.find({
            assignedAgentId: agentId,
            orderStatus: { $in: ['Delivered', 'Cancelled'] }
        }).sort({ updatedAt: -1 });

        res.status(200).json({ success: true, message: "Delivery history retrieved.", data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch delivery history." });
    }
};