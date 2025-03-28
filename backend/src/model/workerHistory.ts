import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    workerId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
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
        status: {
            type: String, 
            required: true,
            enum: ["Active", "Returned", "Pending"]
        }
    }]
});

export default mongoose.model('Worker History', historySchema);
