import taskModel from "../../model/taskModel";
import { ITask, ITaskRepository } from "./taskInterface";

export class TaskRepository implements ITaskRepository {

    public getTasks = async(projectId: string): Promise<ITask[]> => {
        return await taskModel.find({ projectId }).sort({ _id: -1 })
    }

    public getReturnEquipmentByTask = async(taskId: string, _id: string): Promise<ITask | null> => {
        return await taskModel.findOneAndUpdate(
            { _id: taskId, "equipment._id": _id },
            { $set: { "equipment.$.status": "Returned" } },
            { new: true }
        );
    }
}
