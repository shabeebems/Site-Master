import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    equipmentId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'equipment'
    },
    activities: [{
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'tasks'
        },
        task: {
            type: String, 
            required: true,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'projects'
        },
        project: {
            type: String, 
            required: true,
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

export default mongoose.model('Equipment History', historySchema);
