import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    startingDate: { type: Date, required: true },
    endingDate: { type: Date, required: true },
    contractorId: { type: String, required: true },
    status: {
        type: String, 
        required: true,
        enum: ["In progress", "On Hold", "Completed", "Pending"] 
    },
    image: {
        type: String
    }
});

export default mongoose.model('Project', projectSchema);
