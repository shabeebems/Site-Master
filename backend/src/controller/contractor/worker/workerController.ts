import { Request, Response } from 'express';
import { Messages } from "../../../constants/messageConstants";
import { ContractorService } from "../../../services/contractor/contractorService";
import { IWorkerController, WorkerControllerResponse } from "./workerInterface";

const contractorService = new ContractorService()

export class WorkerController implements IWorkerController {
    
    public addWorker = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: WorkerControllerResponse = await contractorService.addWorker(req, req.body)
            
            const { success, message, data } = result

            return res.status(201).json({
                success,
                message,
                data: data || null
            });

        } catch (error) {

            console.error(Messages.ADD_WORKER_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.ADD_WORKER_SERVER_ERROR,
            });
        }
    }

    public getWorkers = async(req: Request, res: Response): Promise<any> => {
        try {

            const result: WorkerControllerResponse = await contractorService.getWorkers(req, req.body)
            
            const { success, message, data } = result
            
            return res.status(201).json({
                success,
                message,
                data
            });

        } catch (error) {

            console.error(Messages.FETCH_WORKERS_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.FETCH_WORKERS_SERVER_ERROR,
            });
        }
    }
}
