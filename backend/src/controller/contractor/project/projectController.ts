import { Request, Response } from 'express';
import { ProjectControllerResponse, IProjectController } from './projectInterface';
import { ProjectService } from '../../../services/contractor/project/projectService';
import { Messages } from '../../../constants/messageConstants';

const projectService = new ProjectService()

export class ProjectController implements IProjectController {

    // Adding new Project
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

    // Get all project to display
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

    // Find single project to display details
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

    // Adding new task to project
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

    // Find available equipment for adding to task (function trigger when try to add tasks)
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
            console.error(Messages.AVAILABLE_EQUIPMENT_FETCH_FAILED, error);
            res.status(500).json({
                success: false,
                message: Messages.AVAILABLE_EQUIPMENT_FETCH_FAILED,
            });
            return
        }
    }

    // Find all equipment used by projects (find from task schema)
    public getProjectEquipment = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.getProjectEquipment(req.params.projectId)
         
            const { success, message, data } = result
            
            res.status(201).json({
                success,
                message,
                data
            });
            return

        } catch (error) {
            console.error(Messages.PROJECT_EQUIPMENT_FETCH_FAILED, error);
            res.status(500).json({
                success: false,
                message: Messages.PROJECT_EQUIPMENT_FETCH_FAILED,
            });
            return
        }
    }

    // Controlling equipment actions (use, return)
    public equipmentAction = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.equipmentAction(req.body)
         
            const { success, message } = result
            
            res.status(201).json({
                success,
                message
            });
            return

        } catch (error) {
            console.error(Messages.EQUIPMENT_ACTION_FAILED, error);
            res.status(500).json({
                success: false,
                message: Messages.EQUIPMENT_ACTION_FAILED,
            });
            return
        }
    }

    // Changing project status based on the current date
    public changeProjectStatus = async(req: Request, res: Response): Promise<void> => {
        try {
            const result: ProjectControllerResponse = await projectService.changeProjectStatus(req.body)
            const { success, message } = result
            
            res.status(201).json({
                success,
                message
            });
            return

        } catch (error) {
            console.error(Messages.CHANGE_PROJECT_STATUS_FAILED, error);
            res.status(500).json({
                success: false,
                message: Messages.CHANGE_PROJECT_STATUS_FAILED,
            });
            return
        }
    }

}