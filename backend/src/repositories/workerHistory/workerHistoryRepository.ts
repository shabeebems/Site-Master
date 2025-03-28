import workerHistory from '../../model/workerHistory';

export class WorkerHistoryRepository {

    public createWorkerHistory = async (workerId: any): Promise<any> => {
        return await workerHistory.create({ workerId })
    }

}

