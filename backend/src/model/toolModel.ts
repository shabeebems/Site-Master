import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
    tool: { type: String, required: true },
    count: { type: Number, required: true },
    available: { type: Number, required: true },
    onSite: { type: Number, required: true },
    contractorId: { type: String, required: true },
    activities: [{
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'tasks'
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'projects'
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        status: {
            type: String, 
            required: true,
            enum: ["Active", "Returned", "Pending"]
        }
    }]
});

export default mongoose.model('Equipment', toolSchema);
