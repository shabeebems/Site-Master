import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/construction")
        console.log('mongodb connect successfully')
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

export default connectDB