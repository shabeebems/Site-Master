import { Request, Response } from 'express';
import { ProjectControllerResponse, IProjectController } from './projectInterface';
import { ContractorService } from '../../../services/contractor/contractorService';
import { Messages } from '../../../constants/messageConstants';

const projectService = new ContractorService()

export class ProjectController implements IProjectController {

    public newProject = async(req: Request, res: Response): Promise<any> => {
        try {
            const result: ProjectControllerResponse = await projectService.newProject(req, req.body)
         
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
            const result: ProjectControllerResponse = await projectService.getProjects(req)
         
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
            const result: ProjectControllerResponse = await projectService.getSingleProject(req.params._id)
         
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
            const result: ProjectControllerResponse = await projectService.addTask(req)
         
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
            const result: ProjectControllerResponse = await projectService.getAvailableEquipment(req)
         
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
            const result: ProjectControllerResponse = await projectService.getTaskEquipment(req.params.projectId)
         
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
            await projectService.returnEquipment(req.body)
         
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
            await projectService.changeProjectStatus(req.body)
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