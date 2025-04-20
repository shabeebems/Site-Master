import { Request, Response } from 'express';
import { EquipmentControllerResponse, IEquipmentController } from './equipmentInterface';
import { Messages } from '../../../constants/messageConstants';
import { EquipmentService } from '../../../services/contractor/equipment/equipmentService';

const equipmentService = new EquipmentService()

export class EquipmentController implements IEquipmentController {

    public addEquipment = async(req: Request, res: Response): Promise<void> => {
            try {
    
                const result: EquipmentControllerResponse = await equipmentService.addEquipment(req, req.body)
                
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
    
                const result: EquipmentControllerResponse = await equipmentService.getEquipment(req)
             
                const { success, message, data } = result
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
    
        public getequipmentDetails = async(req: Request, res: Response): Promise<void> => {
            try {

                console.log('ss')
    
                const result: EquipmentControllerResponse = await equipmentService.getEquipment(req)
             
                const { success, message, data } = result
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
