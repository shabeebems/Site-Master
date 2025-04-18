import { Request, Response } from 'express';

export interface WorkerControllerResponse {
    success: boolean
    message: string
    data?: any
}

export interface IWorkerController {
    addWorker(req: Request, res: Response): Promise<void>;
    getWorkers(req: Request, res: Response): Promise<void>
}