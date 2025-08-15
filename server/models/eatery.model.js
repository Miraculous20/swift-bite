import mongoose from "mongoose";

const eaterySchema = new mongoose.Schema({
    adminUserId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, "Eatery name is required"],
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: [true, "Eatery address is required"]
    },
    imageUrl: String,
    cuisine: [String],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    isOpen: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const EateryModel = mongoose.model("Eatery", eaterySchema);

export default EateryModel;