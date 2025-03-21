import { Request, Response } from "express";

export interface ProjectControllerResponse {
    success: boolean
    message: string
    data?: any
}

export interface IProjectController {
    newProject(req: Request, res: Response): Promise<void>;
    getProjects(req: Request, res: Response): Promise<void>;
    getSingleProject(req: Request, res: Response): Promise<void>;
    addTask(req: Request, res: Response): Promise<void>;
    getAvailableEquipment(req: Request, res: Response): Promise<void>;
    getTaskEquipment(req: Request, res: Response): Promise<void>;
    returnEquipment(req: Request, res: Response): Promise<void>;
    changeProjectStatus(req: Request, res: Response): Promise<void>;
}