import { Request, Response } from 'express';
import { EquipmentControllerResponse, IEquipmentController } from './equipmentInterface';
import { ContractorService } from '../../../services/contractor/contractorService';
import { Messages } from '../../../constants/messageConstants';

const workerService = new ContractorService()

export class EquipmentController implements IEquipmentController {

    public addEquipment = async(req: Request, res: Response): Promise<void> => {
            try {
    
                const result: EquipmentControllerResponse = await workerService.addEquipment(req, req.body)
                
                const { success, message } = result
    
                res.status(201).json({
                    success,
                    message
                });
                return
                
            } catch (error) {
    
                console.error(Messages.ADD_EQUIPMENT_SERVER_ERROR, error);
                res.status(500).json({
                    success: false,
                    message: Messages.ADD_EQUIPMENT_SERVER_ERROR,
                });
                return
            }
        }
    
        public getEquipment = async(req: Request, res: Response): Promise<void> => {
            try {
    
                const result: EquipmentControllerResponse = await workerService.getEquipment(req)
             
                const { success, message, data } = result
                console.log('poooda', data)
                res.status(201).json({
                    success,
                    message,
                    data
                });
                return
            } catch (error) {
                
                console.error(Messages.FETCH_EQUIPMENT_SERVER_ERROR, error);
                res.status(500).json({
                    success: false,
                    message: Messages.FETCH_EQUIPMENT_SERVER_ERROR,
                });
                return
            }
        }
}
