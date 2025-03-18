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
        name: {
            type:String,
            required: true
        },
        count: {
            type:Number,
            required: true
        }
    }],
    workers: { 
        type: Array
    },
});

export default mongoose.model('task', taskSchema);
