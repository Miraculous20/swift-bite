import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: { 
        type: Number,
        required: true
    }
}, { _id: false }); 

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    products: [orderProductSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address',
        required: true
    },
    paymentDetails: {
        paymentId: String,
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed', 'Cash on Delivery'],
            default: 'Pending'
        },
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Ready for Pickup', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    assignedAgentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Agent',
        default: null
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;