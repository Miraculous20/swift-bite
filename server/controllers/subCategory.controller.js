import SubCategoryModel from "../models/subCategory.model.js";

// FIX: Renamed from AddSubCategoryController to createSubCategoryController for consistency
export const createSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body;

        if (!name || !image || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, image, and category ID are required."
            });
        }

        const newSubCategory = new SubCategoryModel({ name, image, category });
        await newSubCategory.save();

        return res.status(201).json({
            success: true,
            message: "Sub-category created successfully.",
            data: newSubCategory
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create sub-category.",
            error: error.message
        });
    }
};

// FIX: Renamed and standardized for getting all sub-categories
export const getSubCategoriesController = async (req, res) => {
    try {
        const subCategories = await SubCategoryModel.find({}).populate('category', 'name').sort({ createdAt: -1 });
        
        return res.status(200).json({
            success: true,
            message: "Sub-categories retrieved successfully.",
            data: subCategories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch sub-categories.",
            error: error.message
        });
    }
};

export const updateSubCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, category } = req.body;

        const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
            id,
            { name, image, category },
            { new: true, runValidators: true }
        );

        if (!updatedSubCategory) {
            return res.status(404).json({ success: false, message: "Sub-category not found." });
        }

        return res.status(200).json({
            success: true,
            message: 'Sub-category updated successfully.',
            data: updatedSubCategory
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update sub-category.",
            error: error.message
        });
    }
};

export const deleteSubCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);

        if (!deletedSubCategory) {
            return res.status(404).json({ success: false, message: "Sub-category not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-category deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete sub-category.",
            error: error.message
        });
    }
};