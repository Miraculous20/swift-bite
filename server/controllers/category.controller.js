import CategoryModel from "../models/category.model.js";

export const addCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({ success: false, message: "Name and image are required." });
        }
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({ success: false, message: "Category already exists." });
        }
        const newCategory = await CategoryModel.create({ name, image });
        res.status(201).json({ success: true, message: "Category created.", data: newCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create category." });
    }
};

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await CategoryModel.find().sort({ name: 1 });
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch categories." });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }
        res.status(200).json({ success: true, message: "Category updated.", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update category." });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        // In a larger app, you'd check for dependencies (products using this category) here.
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }
        res.status(200).json({ success: true, message: "Category deleted." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete category." });
    }
};