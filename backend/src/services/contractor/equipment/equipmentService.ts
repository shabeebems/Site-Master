import { Messages } from "../../../constants/messageConstants";
import { EquipmentRepository } from "../../../repositories/equipment/equipmentRepository";
import { decode } from "../../../utils/jwt";
import { IEquipmentService, ServiceResponse } from "./equipmentInterface";

const equipmentScheme = new EquipmentRepository()

export class EquipmentService implements IEquipmentService {

    public addEquipment = async (req: any, data: any): Promise<ServiceResponse> => {
        try {

            const { tool, count } = data

            // Validating datas
            if(!tool || !count) {
                return {
                    success: false,
                    message: Messages.FIELDS_REQUIRED
                }
            }

            if(count < 1) {
                return {
                    success: false,
                    message: Messages.INVALID_COUNT
                }
            }

            const accessToken = req.cookies.accessToken
            
            // Decode access token for get logged contractor id to save to equipment db
            const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user

            // Save data to db
            await equipmentScheme.addEquipment(data, decoded._id)
            
            return {
                success: true,
                message: Messages.EQUIPMENT_ADDED_SUCCESS
            }

        } catch (error) {
            return {
                success: false,
                message: Messages.EQUIPMENT_ADDED_FAILED
            }
        }
    }

    public getEquipment = async(req: any): Promise<ServiceResponse> => {
            try {
    
                const accessToken = req.cookies.accessToken
                
                // Decode access token for get logged contractor id to get equipment, If access token didnt exist(because access token created this same request) take data from req.user(assigned from tokenValidation middleware)
                const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user
    
                // Find equipment with contractor id
                const equipment = await equipmentScheme.findEquipmentByContractorId(decoded._id)
    
                return {
                    success: true,
                    message: Messages.EQUIPMENT_FETCH_SUCCESS,
                    data: equipment
                }
                
            } catch (error) {
                return {
                    success: false,
                    message: Messages.EQUIPMENT_FETCH_FAILED
                }
            }
        }
}