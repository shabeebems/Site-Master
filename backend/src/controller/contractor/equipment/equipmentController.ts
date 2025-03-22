import { Request, Response } from 'express';
import { EquipmentControllerResponse, IEquipmentController } from './equipmentInterface';
import { ContractorService } from '../../../services/contractor/contractorService';
import { Messages } from '../../../constants/messageConstants';

const workerService = new ContractorService()

export class EquipmentController implements IEquipmentController {
    public addEquipment = async(req: Request, res: Response): Promise<any> => {
            try {
    
                const result: EquipmentControllerResponse = await workerService.addEquipment(req, req.body)
                
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
    
                const result: EquipmentControllerResponse = await workerService.getEquipment(req)
             
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
}
