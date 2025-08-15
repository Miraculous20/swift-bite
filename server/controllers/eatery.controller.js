import UserModel from '../models/user.model.js';
import EateryModel from '../models/eatery.model.js';
import OrderModel from '../models/order.model.js';
import ProductModel from '../models/product.model.js';
import sendEmail from '../config/sendEmail.js';
import eateryWelcomeTemplate from '../utils/eateryWelcomeTemplate.js';

export const registerEateryController = async (req, res) => {
    try {
        const { adminName, adminEmail, password, eateryName, eateryAddress, cuisine } = req.body;
        if (!adminName || !adminEmail || !password || !eateryName || !eateryAddress) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const existingUser = await UserModel.findOne({ email: adminEmail });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "An admin account with this email already exists." });
        }

        const newAdmin = new UserModel({
            name: adminName,
            email: adminEmail,
            password, // Password will be hashed by pre-save hook in user model
            role: 'ADMIN',
            verify_email: true // Auto-verify eatery admins
        });
        const savedAdmin = await newAdmin.save();

        const newEatery = new EateryModel({
            adminUserId: savedAdmin._id,
            name: eateryName,
            address: eateryAddress,
            cuisine: cuisine ? cuisine.split(',').map(c => c.trim()) : [],
        });
        await newEatery.save();

        await sendEmail({
            sendTo: adminEmail,
            subject: `Welcome to Swift-Bite, ${eateryName}!`,
            html: eateryWelcomeTemplate({ adminName, eateryName })
        });

        res.status(201).json({ success: true, message: "Eatery and admin account created successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during eatery registration.", error: error.message });
    }
};

export const getAllEateriesController = async (req, res) => {
    try {
        const eateries = await EateryModel.find({ isOpen: true });
        res.status(200).json({ success: true, data: eateries });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch eateries." });
    }
};

export const getEateryMenuController = async (req, res) => {
    try {
        const { eateryId } = req.params;
        const menu = await ProductModel.find({ eateryId });
        res.status(200).json({ success: true, data: menu });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch menu." });
    }
};

export const getEateryOrdersController = async (req, res) => {
    try {
        // The authEateryMiddleware has already attached req.eatery
        const eateryId = req.eatery._id;

        // Find all products belonging to this eatery
        const productIds = (await ProductModel.find({ eateryId }).select('_id')).map(p => p._id);

        // Find all orders that contain at least one product from this eatery
        const orders = await OrderModel.find({ "products.productId": { $in: productIds } })
            .populate('userId', 'name email')
            .populate('deliveryAddress')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, message: "Eatery orders retrieved.", data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch eatery orders." });
    }
};