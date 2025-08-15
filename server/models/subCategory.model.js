import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Sub-category name is required"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "Sub-category image is required"]
    },
    category: { // A sub-category belongs to one parent category
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    }
}, {
    timestamps: true
});

const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

export default SubCategoryModel;