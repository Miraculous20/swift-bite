import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js"; 

export const paymentController = async (req, res) => { /* ... As provided before ... */ };
export const orderWebhookController = async (req, res) => { /* ... As provided before ... */ };

export const cashOnDeliveryOrderController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.body;

        const cartItems = await CartProductModel.find({ userId }).populate('productId');
        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty." });
        }
        
        let totalAmount = 0;
        const productsForOrder = cartItems.map(item => {
            const priceAfterDiscount = item.productId.price - (item.productId.price * (item.productId.discount / 100));
            totalAmount += item.quantity * priceAfterDiscount;
            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: priceAfterDiscount
            };
        });

        const newOrder = new OrderModel({
            userId,
            deliveryAddress: addressId,
            totalAmount,
            products: productsForOrder,
            paymentDetails: { paymentStatus: 'Cash on Delivery' },
            orderStatus: 'Processing', // Start as processing for COD
        });
        await newOrder.save();
        
        await CartProductModel.deleteMany({ userId });
        
        res.status(201).json({ success: true, message: "Order placed successfully!", data: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to place COD order." });
    }
};

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.user._id })
            .populate('products.productId', 'name image')
            .populate('deliveryAddress')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders." });
    }
};

export const getOrderDetailsController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await OrderModel.findOne({ _id: orderId, userId: req.user._id })
            .populate('products.productId')
            .populate('deliveryAddress')
            .populate('assignedAgentId', 'name phone');
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch order details." });
    }
};