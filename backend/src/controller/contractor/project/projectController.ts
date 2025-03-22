import { Request, Response } from 'express';
import { ProjectControllerResponse, IProjectController } from './projectInterface';
import { ProjectService } from '../../../services/contractor/project/projectService';
import { Messages } from '../../../constants/messageConstants';

const projectService = new ProjectService()

export class ProjectController implements IProjectController {

    public newProject = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.newProject(req, req.body)
         
            const { success, message, data } = result
            
            res.status(201).json({
                success,
                message,
                data
            });
            return

        } catch (error) {
            console.error(Messages.ADD_PROJECT_SERVER_ERROR, error);
            res.status(500).json({
                success: false,
                message: Messages.ADD_PROJECT_SERVER_ERROR,
            });
            return
        }
    }

    public getProjects = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.getProjects(req)
         
            const { success, message, data } = result
            
            res.status(201).json({
                success,
                message,
                data
            });
            return
        } catch (error) {
            console.error(Messages.FETCH_PROJECTS_SERVER_ERROR, error);
            res.status(500).json({
                success: false,
                message: Messages.FETCH_PROJECTS_SERVER_ERROR,
            });
            return
        }

    }

    public getSingleProject = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.getSingleProject(req.params._id)
         
            const { success, message, data } = result
            
            res.status(201).json({
                success,
                message,
                data
            });
            return

        } catch (error) {
            console.error(Messages.SINGLE_PROJECTS_FETCH_FAILED, error);
            res.status(500).json({
                success: false,
                message: Messages.SINGLE_PROJECTS_FETCH_FAILED,
            });
            return
        }
    }

    public addTask = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.addTask(req)
         
            const { success, message } = result
            
            res.status(201).json({
                success,
                message,
            });
            return

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
            return
        }
    }

    public getAvailableEquipment = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.getAvailableEquipment(req)
         
            const { success, message, data } = result
            
            res.status(201).json({
                success,
                message,
                data
            });
            return

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
            return
        }
    }

    public getTaskEquipment = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.getTaskEquipment(req.params.projectId)
         
            const { success, message, data } = result
            
            res.status(201).json({
                success,
                message,
                data
            });
            return

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
            return
        }
    }

    public returnEquipment = async(req: Request, res: Response): Promise<void> => {
        try {
            // const result: ControllerResponse = 
            await projectService.returnEquipment(req.body)
         
            // const { success, message, data } = result
            
            res.status(201).json({
                success: true,
                message: 'ss',
            });
            return

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
            return
        }
    }

    public changeProjectStatus = async(req: Request, res: Response): Promise<void> => {
        try {
            // const result: ControllerResponse = 
            await projectService.changeProjectStatus(req.body)
            // const { success, message, data } = result
            
            res.status(201).json({
                success: true,
                message: 'ss',
            });
            return

        } catch (error) {
            console.error(Messages.ADD_TASK_SERVER_ERROR, error);
            res.status(500).json({
                success: false,
                message: Messages.ADD_TASK_SERVER_ERROR,
            });
            return
        }
    }

}