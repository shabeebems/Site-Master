import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 120 // 120 seconds = 2 minutes
    }
});

export default mongoose.model('Otp', otpSchema);
