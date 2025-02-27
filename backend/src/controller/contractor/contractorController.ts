import { Request, Response } from 'express';
import { ControllerResponse, IContractorController } from './contractorInterface';
import { ContractorService } from '../../services/contractor/contractorService';

const contractorService = new ContractorService

export class ContractorController implements IContractorController {

    public addWorker = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.addWorker(req, req.body)
            return res.status(201).json({
                success: result.success,
                message: result.message,
                data: result.data || null
            });

        } catch (error) {
            console.error("Unexpected error in add worker controller:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error. Please try again later.",
            });
        }
    }

    public getWorkers = async(req: Request, res: Response): Promise<any> => {
        try {

            const result: ControllerResponse = await contractorService.getWorkers(req, req.body)
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            console.error("Unexpected error in get worker controller:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error. Please try again later.",
            });
        }
    }

    public addEquipment = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.addEquipment(req, req.body)
            return res.status(201).json({
                success: result.success,
                message: result.message
            });
            
        } catch (error) {
            console.error("Unexpected error in add equipment controller:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error. Please try again later.",
            });
        }
    }

}