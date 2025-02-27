import { emailValidation } from "../../utils/emailValidation";
import { AddUserData, IContractorService, ServiceResponse } from "./contractorInterface";
import hashedPassword from '../../utils/hashPassword'
import sendPassword from "../../utils/sendPassword";
import { Request } from 'express';
import { decode } from "../../utils/jwt";
import { UserRepository } from "../../repositories/user/userRepository";
import { EquipmentRepository } from "../../repositories/equipment/equipmentRepository";

const userScheme = new UserRepository()
const equipmentScheme = new EquipmentRepository()

export class ContractorService implements IContractorService {


    public addWorker = async(req: Request, data: AddUserData): Promise<ServiceResponse> => {
        try {
            const { name, mobile, email, place } = data
            if(!name || !mobile || !email || !place) {
                return {
                    success: false,
                    message: 'Fill the blanks'
                }
            }
            const existingUser = await userScheme.findUserByEmail(email)
            if(existingUser) {
                return {
                    success: false,
                    message: 'Email already exists'
                }
            }
            if(!emailValidation(email)) {
                return {
                    success: false,
                    message: 'Enter valid email'
                }
            } if(/\D/.test(mobile)) {
                return {
                    success: false,
                    message: 'Enter valid mobile'
                }
            }
            const password = Math.floor(100000 + Math.random() * 900000);
            const hashPassword = await hashedPassword(password + '')
            sendPassword(email, password + '')
            const accessToken = req.cookies.accessToken
            const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
            const decoded: any = await decode(accessToken, ACCESS_TOKEN_SECRET)
            const worker = {
                contractorId: decoded._id,
                ...data,
                password: hashPassword,
                role: 'Worker',
            }
            await userScheme.createUser(worker)
    
            return {
                success: true,
                message: 'Success',
                data: data
            }
        } catch (error) {
            console.log('error')
            return {
                success: false,
                message: 'Add worker failed'
            }
        }
    }

    public getWorkers = async(req: Request, data: AddUserData): Promise<ServiceResponse> => {
        try {
            const accessToken = req.cookies.accessToken
            const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
            const decoded: any = await decode(accessToken, ACCESS_TOKEN_SECRET)
            const workers = await userScheme.findWorkersByContractorId(decoded._id)
            return {
                success: true,
                data: workers,
                message: 'Ok'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Get worker failed'
            }
        }
    }

    public addEquipment = async (req: Request, data: any): Promise<ServiceResponse> => {
        const { tool, count } = data
        if(!tool || !count) {
            return {
                success: false,
                message: 'Fill the blanks'
            }
        }
        if(count < 1) {
            return {
                success: false,
                message: 'Count must be positive number'
            }
        }
        const accessToken = req.cookies.accessToken
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
        const decoded: any = await decode(accessToken, ACCESS_TOKEN_SECRET)
        await equipmentScheme.addEquipment(data, decoded._id)

        return {
            success: true,
            message: 'Equipment adding success'
        }
    }

    public getEquipment = async(req: Request): Promise<ServiceResponse> => {
        try {
            const accessToken = req.cookies.accessToken
            const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
            const decoded: any = await decode(accessToken, ACCESS_TOKEN_SECRET)
            const equipment = await equipmentScheme.findEquipmentByContractorId(decoded._id)
            return {
                success: true,
                message: 'Equipment feching successfull',
                data: equipment
            }
        } catch (error) {
            return {
                success: false,
                message: 'Server problem on fetching equipment'
            }
        }
    }

}