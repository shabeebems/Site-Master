export interface ITask {
    _id: any;
    projectId: any;
    name: string;
    startingDate: Date;
    endingDate: Date;
    equipment: object[];
    workers: string[];
}

export interface ITaskRepository {
    getTasks(projectId: string): Promise<ITask[]>;
    getReturnEquipmentByTask(taskId: string, _id: string, status: string): Promise<ITask | null>;
}
