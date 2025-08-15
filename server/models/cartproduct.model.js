import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity cannot be less than 1"]
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

// Create a compound index to prevent a user from adding the same product to the cart twice
cartProductSchema.index({ userId: 1, productId: 1 }, { unique: true });

const CartProductModel = mongoose.model('CartProduct', cartProductSchema);

export default CartProductModel;