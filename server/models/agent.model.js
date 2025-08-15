import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true
    },
    status: {
        type: String,
        enum: ["Available", "On-Delivery", "Offline"],
        default: "Offline"
    },
    currentLocation: {
        lat: Number,
        lng: Number
    },
    refreshToken: String
}, {
    timestamps: true
});

// Hash password before saving
agentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const AgentModel = mongoose.model("Agent", agentSchema);

export default AgentModel;