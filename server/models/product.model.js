import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    eateryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Eatery',
        required: true
    },
    image: {
        type: [String], // Array of strings
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    },
    description: String,
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    discount: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    unit: String, // e.g., 'per slice', '1 bowl'
}, {
    timestamps: true
});

// Create a text index for searching
productSchema.index({ name: "text", description: "text" });

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;