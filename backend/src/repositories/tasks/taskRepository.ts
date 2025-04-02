import taskModel from "../../model/taskModel";
import { ITask, ITaskRepository } from "./taskInterface";

export class TaskRepository implements ITaskRepository {

    public createOne = async(data: ITask): Promise<ITask> => {
        return taskModel.insertOne(data)
    }

    public getTasks = async(projectId: string): Promise<ITask[]> => {
        return await taskModel.find({ projectId }).sort({ _id: -1 })
    }

    public findTaskById = async(_id: string): Promise<ITask | any> => {
        return await taskModel.findOne({ _id })
    }

    public addEquipment = async(_id: string, data: any): Promise<ITask | any> => {
        return await taskModel.updateOne({ _id }, { $push: { equipment: data } })
    }

    public updateEquipmentByTask = async(taskId: string, _id: string, status: string): Promise<ITask | null> => {
        return await taskModel.findOneAndUpdate(
            { _id: taskId, "equipment._id": _id },
            { $set: { "equipment.$.status": status } },
            { new: true }
        );
    }

    public editStatus = async(_id: string, status: string): Promise<void> => {
        await taskModel.updateOne({ _id }, { $set: { status } })
    }

    public addWorker = async(_id: string, workerId: string): Promise<void> => {
        const a = await taskModel.updateOne({ _id }, { $push: { workers: workerId } })
        console.log(a)
    }

}
