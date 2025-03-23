import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    projectId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'projects'
    },
    name: { type: String, required: true },
    startingDate: { type: Date, required: true },
    endingDate: { type: Date, required: true },
    equipment: [{
        equipmentId : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'equipment'
        },
        name: {
            type:String,
            required: true
        },
        count: {
            type:Number,
            required: true
        },
        status: {
            type: String, 
            required: true,
            enum: ["Active", "Returned", "Pending"] 
        },
    }],
    workers: { 
        type: Array
    },
    status: {
        type: String, 
        required: true,
        enum: ["In progress", "On hold", "Completed", "Pending"] 
    },
});

export default mongoose.model('task', taskSchema);
