import { emailValidation } from "../../utils/emailValidation";
import { AddUserData, IContractorService, ServiceResponse } from "./contractorInterface";
import hashedPassword from '../../utils/hashPassword'
import sendPassword from "../../utils/sendPassword";
import { Request } from 'express';
import { decode } from "../../utils/jwt";
import { UserRepository } from "../../repositories/user/userRepository";
import { EquipmentRepository } from "../../repositories/equipment/equipmentRepository";
import { Messages } from "../../constants/messageConstants";

const userScheme = new UserRepository()
const equipmentScheme = new EquipmentRepository()

export class ContractorService implements IContractorService {


    public addWorker = async(req: Request, data: AddUserData): Promise<ServiceResponse> => {
        try {

            const { name, mobile, email, place } = data

            if(!name || !mobile || !email || !place) {
                return {
                    success: false,
                    message: Messages.FIELDS_REQUIRED
                }
            }

            const existingUser = await userScheme.findUserByEmail(email)

            if(existingUser) {
                return {
                    success: false,
                    message: Messages.EMAIL_ALREADY_EXISTS
                }
            }

            if(!emailValidation(email)) {
                return {
                    success: false,
                    message: Messages.INVALID_EMAIL
                }
            }
            
            if(/\D/.test(mobile)) {
                return {
                    success: false,
                    message: Messages.INVALID_MOBILE
                }
            }

            // After validation success
            // Create a random password to sent worker email
            const password = Math.floor(100000 + Math.random() * 900000);
            const hashPassword = await hashedPassword(password + '')

            // Send password and email to workers's email
            sendPassword(email, password + '')

            // Decode access token for get logged contractor id to save on worker db
            const accessToken = req.cookies.accessToken
            const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
            const decoded: any = await decode(accessToken, ACCESS_TOKEN_SECRET)

            // Create and add to db
            const worker = {
                contractorId: decoded._id,
                ...data,
                password: hashPassword,
                role: 'Worker',
            }
            await userScheme.createUser(worker)
    
            return {
                success: true,
                message: Messages.WORKER_CREATED_SUCCESS,
                data: data
            }

        } catch (error) {
            console.log('error')
            return {
                success: false,
                message: Messages.WORKER_CREATION_FAILED
            }
        }
    }

    public getWorkers = async(req: any, data: AddUserData): Promise<ServiceResponse> => {
        try {
            console.log('service')
            // Decode access token for get logged contractor id to get workers db
            console.log('service')
            const accessToken = req.cookies.accessToken
            const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
            const decoded: any = accessToken ? await decode(accessToken, ACCESS_TOKEN_SECRET) : req.user
            console.log(decoded)

            // Find workers using contractor id
            const workers = await userScheme.findWorkersByContractorId(decoded._id)
            // console.log(workers)
            return {
                success: true,
                data: workers,
                message: Messages.FETCH_WORKER_SUCCESS
            }

        } catch (error) {
            return {
                success: false,
                message: Messages.FETCH_WORKER_FAILED
            }
        }
    }

    public addEquipment = async (req: Request, data: any): Promise<ServiceResponse> => {
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

            // Decode access token for get logged contractor id to save to equipment db
            const accessToken = req.cookies.accessToken
            const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
            const decoded: any = await decode(accessToken, ACCESS_TOKEN_SECRET)

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

            // Decode access token for get logged contractor id to get equipment
            const accessToken = req.cookies.accessToken
            const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
            const decoded: any = accessToken ? await decode(accessToken, ACCESS_TOKEN_SECRET) : req.user

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