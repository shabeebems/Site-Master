import { Request, Response } from 'express';
import { ControllerResponse, IContractorController } from './contractorInterface';
import { ContractorService } from '../../services/contractor/contractorService';
import { Messages } from '../../constants/messageConstants';

const contractorService = new ContractorService

export class ContractorController implements IContractorController {

    public addWorker = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.addWorker(req, req.body)
            
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

            const result: ControllerResponse = await contractorService.getWorkers(req, req.body)
            
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

    public addEquipment = async(req: Request, res: Response): Promise<any> => {
        try {

            const result: ControllerResponse = await contractorService.addEquipment(req, req.body)
            
            const { success, message } = result

            return res.status(201).json({
                success,
                message
            });
            
        } catch (error) {

            console.error(Messages.ADD_EQUIPMENT_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.ADD_EQUIPMENT_SERVER_ERROR,
            });
        }
    }

    public getEquipment = async(req: Request, res: Response): Promise<any> => {
        try {

            const result: ControllerResponse = await contractorService.getEquipment(req)
         
            const { success, message, data } = result
            
            return res.status(201).json({
                success,
                message,
                data
            });
        
        } catch (error) {
            
            console.error(Messages.FETCH_EQUIPMENT_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.FETCH_EQUIPMENT_SERVER_ERROR,
            });
        }
    }

    public newProject = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.newProject(req, req.body)
         
            const { success, message, data } = result
            
            return res.status(201).json({
                success,
                message,
                data
            });

        } catch (error) {
            console.error(Messages.ADD_PROJECT_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.ADD_PROJECT_SERVER_ERROR,
            });
        }
    }

    public getProjects = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.getProjects(req)
         
            const { success, message, data } = result
            
            return res.status(201).json({
                success,
                message,
                data
            });

        } catch (error) {
            console.error(Messages.FETCH_PROJECTS_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.FETCH_PROJECTS_SERVER_ERROR,
            });
        }

    }

    public getSingleProject = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.getSingleProject(req.params._id)
         
            const { success, message, data } = result
            
            return res.status(201).json({
                success,
                message,
                data
            });

        } catch (error) {
            console.error(Messages.SINGLE_PROJECTS_FETCH_FAILED, error);
            return res.status(500).json({
                success: false,
                message: Messages.SINGLE_PROJECTS_FETCH_FAILED,
            });
        }
    }

    public addTask = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.addTask(req)
         
            const { success, message } = result
            
            return res.status(201).json({
                success,
                message,
            });

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
        }
    }

    public getAvailableEquipment = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.getAvailableEquipment(req)
         
            const { success, message, data } = result
            
            return res.status(201).json({
                success,
                message,
                data
            });

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
        }
    }

    public getTaskEquipment = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ControllerResponse = await contractorService.getTaskEquipment(req.params.projectId)
         
            const { success, message, data } = result
            
            return res.status(201).json({
                success,
                message,
                data
            });

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
        }
    }

    public returnEquipment = async(req: Request, res: Response): Promise<any> => {
        try {
            // const result: ControllerResponse = 
            await contractorService.returnEquipment(req.body)
         
            // const { success, message, data } = result
            
            return res.status(201).json({
                success: true,
                message: 'ss',
            });

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
        }
    }

    public changeProjectStatus = async(req: Request, res: Response): Promise<any> => {
        try {
            // const result: ControllerResponse = 
            await contractorService.changeProjectStatus(req.body)
            // const { success, message, data } = result
            
            return res.status(201).json({
                success: true,
                message: 'ss',
            });

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            return res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
        }
    }

}