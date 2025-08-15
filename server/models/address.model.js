import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    address_line: {
        type: String,
        required: [true, "Street address is required."],
        trim: true
    },
    lga: { // Local Government Area
        type: String,
        required: [true, "LGA is required."]
    },
    city: {
        type: String,
        required: [true, "City is required."],
        default: "Uyo"
    },
    state: {
        type: String,
        required: [true, "State is required."],
        default: "Akwa Ibom"
    },
    pincode: {
        type: String,
        required: [true, "Pincode is required."]
    },
    country: {
        type: String,
        required: [true, "Country is required."],
        default: "Nigeria"
    },
    mobile: {
        type: String,
        required: [true, "A contact mobile number is required."]
    }
}, {
    timestamps: true
});

const AddressModel = mongoose.model('Address', addressSchema);

export default AddressModel;