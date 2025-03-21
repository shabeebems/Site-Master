import { emailValidation } from "../../utils/emailValidation";
import { AddProject, AddUserData, IContractorService, ServiceResponse } from "./contractorInterface";
import hashedPassword from '../../utils/hashPassword'
import sendPassword from "../../utils/sendPassword";
import { decode } from "../../utils/jwt";
import { Messages } from "../../constants/messageConstants";

import cloudinary from '../../utils/cloudinary'

import { UserRepository } from "../../repositories/user/userRepository";
import { EquipmentRepository } from "../../repositories/equipment/equipmentRepository";
import { ProjectRepository } from "../../repositories/project/projectRepository";
import taskModel from "../../model/taskModel";
import toolModel from "../../model/toolModel";
import { TaskRepository } from "../../repositories/tasks/taskRepository";

const projectSchema = new ProjectRepository()
const userScheme = new UserRepository()
const equipmentScheme = new EquipmentRepository()
const taskScheme = new TaskRepository()

export class ContractorService implements IContractorService {

    public addWorker = async(req: any, data: AddUserData): Promise<ServiceResponse> => {
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

            const accessToken = req.cookies.accessToken
            
            // Decode access token for get logged contractor id for get workers from db, If access token didnt exist(because access token created this same request) take data from req.user(assigned from tokenValidation middleware)
            const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user

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

    public newProject = async(req: any, data: AddProject): Promise<ServiceResponse> => {
        try {

            const { name, location, startingDate, endingDate, image } = data

            if(!name || !location || !startingDate || !endingDate || !image) {
                return {
                    success: false,
                    message: Messages.FIELDS_REQUIRED,
                }
            }

            if(startingDate > endingDate) {
                return {
                    success: false,
                    message: Messages.STARTING_DATE_GREATER,
                }
            }

            // Upload image to cloudinary
            let result = await cloudinary.uploader.upload(image, {
                folder: "user",
            });

            const accessToken = req.cookies.accessToken
            
            // Decode access token for get logged contractor id for get workers from db, If access token didnt exist(because access token created this same request) take data from req.user(assigned from tokenValidation middleware)
            const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user

            const projectDetails = {
                ...data,
                contractorId: decoded._id,
                status: 'Pending',
                image: result.url
            }


            await projectSchema.addProject(projectDetails)

            return {
                success: true,
                message: Messages.PROJECT_ADDED_SUCCESS,
            }
            
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.PROJECT_ADD_SERVER_ERROR
            }
        }
    }

    public getProjects = async(req: any): Promise<ServiceResponse> => {
        try {

            const accessToken = req.cookies.accessToken
            
            // Decode access token for get logged contractor id for get workers from db, If access token didnt exist(because access token created this same request) take data from req.user(assigned from tokenValidation middleware)
            const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user

            const projects = await projectSchema.getProjects(decoded._id)

            return {
                success: true,
                message: Messages.PROJECTS_FETCH_SUCCESS,
                data: projects
            }
            
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.PROJECTS_FETCH_FAILED
            }
        }
    }

    public getSingleProject = async(_id: string): Promise<ServiceResponse> => {
        try {
            
            const project = await projectSchema.findProjectById(_id)
            const tasks = await taskScheme.getTasks(_id)

            // Type assertion for equipment on taking from tasks
            // type Equipment = {
            //     equipmentId: string;
            //     name: string;
            //     count: number;
            // };
            // Extract equipment from tasks
            // const equipments = tasks.flatMap(task =>
            //     task.equipment.map(equipment => {
            //         const eq = equipment as Equipment; // Type assertion
                
            //         return {
            //             equipmentId: eq.equipmentId,
            //             name: eq.name,
            //             count: eq.count,
            //             startingDate: task.startingDate,
            //             endingDate: task.endingDate
            //         };
            //     })
            // );
              
            return {
                success: true,
                message: Messages.SINGLE_PROJECTS_FETCH_SUCCESS,
                data: [project, tasks]
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.SINGLE_PROJECTS_FETCH_FAILED
            }
        }
    }

    public addTask = async(req: any): Promise<ServiceResponse> => {
        try {
            const { name, startingDate, endingDate } = req.body
            if(!name || !startingDate || !endingDate) {
                return {
                    success: false,
                    message: Messages.FIELDS_REQUIRED,
                }
            }

            if(startingDate > endingDate) {
                return {
                    success: false,
                    message: Messages.STARTING_DATE_GREATER,
                }
            }
            console.log('23123', req.body)
            await taskModel.insertOne({ ...req.params, ...req.body, status: 'Pending' })

            // decrease count from available and increase from onSite equipment 
            for (const item of req.body.equipment) {
                await toolModel.updateOne(
                    { _id: item.equipmentId }, // Find by equipmentId
                    { $inc: { available: -item.count, onSite: item.count } } // Decrease available count
                );
            }

            return {
                success: true,
                message: Messages.TASK_ADDED_SUCCESS,
            }
            
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.TASK_ADDED_FAILED
            }
        }
    }

    // For adding equipment to task
    public getAvailableEquipment = async(req: any): Promise<ServiceResponse> => {
        try {
            const accessToken = req.cookies.accessToken
            
            // Decode access token for get logged contractor id for get equipment from db, If access token didnt exist(because access token created this same request) take data from req.user(assigned from tokenValidation middleware)
            const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user

            const availableEquipment = await equipmentScheme.findAvailableEquipment(decoded._id)
            
            return {
                success: true,
                message: Messages.TASK_ADDED_SUCCESS,
                data: availableEquipment
            }
            
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.TASK_ADDED_FAILED
            }
        }
    }

    public getTaskEquipment = async(projectId: any): Promise<ServiceResponse> => {
        try {
            const tasks = await taskScheme.getTasks(projectId)

            // Type assertion for equipment on taking from tasks
            type Equipment = {
                equipmentId: string;
                name: string;
                count: number;
                _id: any;
                status: string;
            };
            // Extract equipment from tasks
            const equipments = tasks.flatMap(task =>
                task.equipment.map(equipment => {
                    const eq = equipment as Equipment; // Type assertion
                
                    return {
                        taskName: task.name,
                        equipmentId: eq.equipmentId,
                        _id: eq._id,
                        taskId: task._id,
                        name: eq.name,
                        count: eq.count,
                        startingDate: task.startingDate,
                        endingDate: task.endingDate,
                        status: eq.status,
                    };
                })
            );

            return {
                success: true,
                message: Messages.TASK_ADDED_SUCCESS,
                data: equipments
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.TASK_ADDED_FAILED
            }
        }
    }

    public returnEquipment = async(data: any): Promise<ServiceResponse> => {
        try {
            await taskScheme.getReturnEquipmentByTask(data.taskId, data._id)
            await equipmentScheme.returnEquipment(data.equipmentId, data.count)
            return {
                success: true,
                message: Messages.TASK_ADDED_SUCCESS,
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.TASK_ADDED_FAILED
            }
        }
    }

    public changeProjectStatus = async(data: any): Promise<ServiceResponse> => {
        try {
            projectSchema.editStatus(data._id, data.status)
            return {
                success: true,
                message: Messages.TASK_ADDED_SUCCESS,
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.TASK_ADDED_FAILED
            }
        }
    }
}