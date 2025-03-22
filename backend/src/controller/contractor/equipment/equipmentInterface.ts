import { Request, Response } from "express";

export interface EquipmentControllerResponse {
    success: boolean
    message: string
    data?: any
}


export interface IEquipmentController {
    addEquipment(req: Request, res: Response): Promise<void>;
    getEquipment(req: Request, res: Response): Promise<void>;
}