export interface ITask {
    projectId: any;
    name: string;
    startingDate: Date;
    endingDate: Date;
    equipment: object[];
    workers: string[];
}

export interface ITaskRepository {
    getTasks(projectId: any): Promise<ITask[]>;
}
