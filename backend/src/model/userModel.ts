import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    is_block: {
        type: Boolean,
        required: true,
        default: false
    },
    mobile: { 
        type: String 
    },
    place: { 
        type: String 
    },
    contractorId: { 
        type: String
    },
    password: { 
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    is_admin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: { 
        type: String,
        required: true
    },
    image: {
        type: String,
    }
})

export default mongoose.model('User', userSchema)
