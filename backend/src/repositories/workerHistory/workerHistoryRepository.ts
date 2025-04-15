import workerHistory from '../../model/workerHistory';

export class WorkerHistoryRepository {

    public createWorkerHistory = async (workerId: any): Promise<any> => {
        return await workerHistory.create({ workerId })
    }

    public pushHistory = async(workerId: any, task: any): Promise<any> => {
        return workerHistory.findOneAndUpdate({ workerId: workerId }, {
            $push: {
                activities: {
                    taskId: task._id,
                    project: task.project,
                    projectId: task.projectId,
                    start: task.startingDate,
                    end: task.endingDate,
                    status: 'Pending',
                    task: task.name
                }
            }
        })
    }

    public findByWorkerId = async (workerId: any): Promise<any> => {
        return await workerHistory.findOne({ workerId }, { activities: 1, _id: 0 })
    }

}

