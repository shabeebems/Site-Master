import { Request, Response } from 'express';

export interface ControllerResponse {
    success: boolean
    message: string
    data?: any
}

export interface IContractorController {
    addWorker(req: Request, res: Response): Promise<ControllerResponse>;
    getWorkers(req: Request, res: Response): Promise<any>
}