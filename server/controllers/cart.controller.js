import CartProductModel from "../models/cartproduct.model.js";

export const getCartController = async (req, res) => {
    try {
        const cartItems = await CartProductModel.find({ userId: req.user._id }).populate({
            path: 'productId',
            select: 'name price image discount unit eateryName'
        });
        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch cart." });
    }
};

export const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const existingItem = await CartProductModel.findOne({ userId, productId });
        if (existingItem) {
            existingItem.quantity += 1;
            await existingItem.save();
            return res.status(200).json({ success: true, message: "Item quantity updated.", data: existingItem });
        }

        const newItem = await CartProductModel.create({ userId, productId, quantity: 1 });
        res.status(201).json({ success: true, message: "Item added to cart.", data: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add to cart." });
    }
};

export const updateCartItemQtyController = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        if (quantity < 1) {
            return res.status(400).json({ success: false, message: "Quantity must be at least 1." });
        }
        const updatedItem = await CartProductModel.findOneAndUpdate(
            { _id: cartItemId, userId: req.user._id },
            { quantity },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Cart item not found." });
        }
        res.status(200).json({ success: true, message: "Quantity updated.", data: updatedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update quantity." });
    }
};

export const deleteCartItemController = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const deletedItem = await CartProductModel.findOneAndDelete({ _id: cartItemId, userId: req.user._id });
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Cart item not found." });
        }
        res.status(200).json({ success: true, message: "Item removed from cart." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to remove item." });
    }
};