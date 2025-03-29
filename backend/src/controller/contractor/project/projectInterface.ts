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
    getProjectEquipment(req: Request, res: Response): Promise<void>;
    equipmentAction(req: Request, res: Response): Promise<void>;
    changeProjectStatus(req: Request, res: Response): Promise<void>;
    changeTaskStatus(req: Request, res: Response): Promise<void>;
    getSingleTask(req: Request, res: Response): Promise<void>;
    checkEquipmentCount(req: Request, res: Response): Promise<void>;
    taskEquipmentAdd(req: Request, res: Response): Promise<void>;
    getWorkerRoles(req: Request, res: Response): Promise<void>;
    getWorkerToAddTask(req: Request, res: Response): Promise<void>;
    taskWorkerAdd(req: Request, res: Response): Promise<void>;

}