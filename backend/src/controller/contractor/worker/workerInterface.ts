import { Request, Response } from 'express';

export interface WorkerControllerResponse {
    success: boolean
    message: string
    data?: any
}

export interface IWorkerController {
    addWorker(req: Request, res: Response): Promise<any>;
    getWorkers(req: Request, res: Response): Promise<any>
}