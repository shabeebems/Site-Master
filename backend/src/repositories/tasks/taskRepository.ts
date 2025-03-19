import taskModel from "../../model/taskModel";
import { ITask, ITaskRepository } from "./taskInterface";

export class TaskRepository implements ITaskRepository {

    public getTasks = async(projectId: any): Promise<ITask[]> => {
        return await taskModel.find({ projectId })
    }

}
