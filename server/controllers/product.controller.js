import ProductModel from "../models/product.model.js";
import EateryModel from "../models/eatery.model.js";

export const createProductController = async (req, res) => {
    try {
        const adminUserId = req.user._id;
        const eatery = await EateryModel.findOne({ adminUserId });
        if (!eatery) {
            return res.status(403).json({ success: false, message: "No eatery associated with this admin account." });
        }
        
        const newProduct = new ProductModel({ ...req.body, eateryId: eatery._id });
        await newProduct.save();

        res.status(201).json({ success: true, message: "Product created successfully.", data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create product.", error: error.message });
    }
};

export const getProductsController = async (req, res) => {
    try {
        const products = await ProductModel.find().populate('eateryId', 'name').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch products." });
    }
};

export const getProductDetailsController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id).populate('eateryId', 'name address');
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch product details." });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.status(200).json({ success: true, message: "Product updated successfully.", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update product." });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete product." });
    }
};

export const searchProductsController = async (req, res) => {
    try {
        const { q } = req.query;
        const products = await ProductModel.find({ $text: { $search: q } });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to search products." });
    }
};