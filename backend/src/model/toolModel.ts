import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
    tool: { type: String, required: true },
    count: { type: Number, required: true },
    available: { type: Number, required: true },
    onSite: { type: Number, required: true },
    contractorId: { type: String, required: true },
});

export default mongoose.model('Equipment', toolSchema);
