import taskModel from "../../model/taskModel";
import { ITask, ITaskRepository } from "./taskInterface";

export class TaskRepository implements ITaskRepository {

    public getTasks = async(projectId: any): Promise<ITask[]> => {
        return await taskModel.find({ projectId }).sort({ _id: -1 })
    }

    public getReturnEquipmentByTask = async(taskId: any, _id: any): Promise<any> => {
        return await taskModel.findOneAndUpdate(
            { _id: taskId, "equipment._id": _id },
            { $set: { "equipment.$.status": "Returned" } },
            { new: true }
        );
    }
}
