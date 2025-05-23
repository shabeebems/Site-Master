import { Messages } from "../../../constants/messageConstants";
import { UserRepository } from "../../../repositories/user/userRepository";
import { emailValidation } from "../../../utils/emailValidation";
import { AddWorkerData, IWorkerService, ServiceResponse } from "./workerInterface";
import hashedPassword from '../../../utils/hashPassword'
import sendPassword from "../../../utils/sendPassword";
import { decode } from "../../../utils/jwt";
import { WorkerHistoryRepository } from "../../../repositories/workerHistory/workerHistoryRepository";

const userScheme = new UserRepository()
const workerHistoryScheme = new WorkerHistoryRepository()

export class WorkerService implements IWorkerService {

    public addWorker = async(req: any, data: AddWorkerData): Promise<ServiceResponse> => {
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

            const accessToken = req.cookies.accessToken
            
            // Decode access token for get logged contractor id to save on worker db, 
            const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user

            // Create and add to db
            const worker = {
                contractorId: decoded._id,
                ...data,
                password: hashPassword,
                role: 'Worker'
            }
            const newWorker = await userScheme.createUser(worker)

            await workerHistoryScheme.createWorkerHistory(newWorker._id)

            return {
                success: true,
                message: Messages.WORKER_CREATED_SUCCESS,
                data: { ...data, _id: newWorker._id }
            }

        } catch (error) {
            console.log('error')
            return {
                success: false,
                message: Messages.WORKER_CREATION_FAILED
            }
        }
    }

    public getWorkers = async(req: any): Promise<ServiceResponse> => {
        try {
            const { currentPage, itemsPerPage } = req.params
            const accessToken = req.cookies.accessToken
            
            // Decode access token for get logged contractor id for get workers from db, If access token didnt exist(because access token created this same request) take data from req.user(assigned from tokenValidation middleware)
            const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user

            // Find workers using contractor id
            const workers = await userScheme.findWorkersByContractorId(decoded._id, currentPage - 1, itemsPerPage)
            const totalWorkersCount = await userScheme.findWorkersCount(decoded._id)
            return {
                success: true,
                data: { workers, totalWorkersCount },
                message: Messages.FETCH_WORKER_SUCCESS
            }

        } catch (error) {
            return {
                success: false,
                message: Messages.FETCH_WORKER_FAILED
            }
        }
    }

    public getWorkerDetails = async(_id: string): Promise<ServiceResponse> => {
        try {

            const worker = await userScheme.findUserBy_id(_id)
            const workerHistory = await workerHistoryScheme.findByWorkerId(_id)
            return {
                success: true,
                message: Messages.FETCH_WORKER_SUCCESS,
                data: { worker, workerHistory }
            }

        } catch (error) {
            return {
                success: false,
                message: Messages.FETCH_WORKER_FAILED
            }
        }
    }

    public editWorker = async(worker: any): Promise<ServiceResponse> => {
        try {

            await userScheme.updateWorker(worker)

            return {
                success: true,
                message: Messages.FETCH_WORKER_SUCCESS,
            }

        } catch (error) {
            return {
                success: false,
                message: Messages.FETCH_WORKER_FAILED
            }
        }
    }
}
