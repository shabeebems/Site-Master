import { AddProject, IProjectService, ServiceResponse } from "./projectInterface";
import { decode } from "../../../utils/jwt";
import { Messages } from "../../../constants/messageConstants";

import cloudinary from '../../../utils/cloudinary'

import { EquipmentRepository } from "../../../repositories/equipment/equipmentRepository";
import { ProjectRepository } from "../../../repositories/project/projectRepository";
import { TaskRepository } from "../../../repositories/tasks/taskRepository";
import { extractEquipment } from "../../../utils/extractEquipment";

const projectSchema = new ProjectRepository()
const equipmentScheme = new EquipmentRepository()
const taskScheme = new TaskRepository()

export class ProjectService implements IProjectService {

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


            const newProject = await projectSchema.addProject(projectDetails)
            return {
                success: true,
                message: Messages.PROJECT_ADDED_SUCCESS,
                data: newProject
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
                    message: Messages.FIELDS_REQUIRED
                }
            }

            if(startingDate > endingDate) {
                return {
                    success: false,
                    message: Messages.STARTING_DATE_GREATER
                }
            }

            await taskScheme.createOne({ ...req.params, ...req.body, status: 'Pending' })
            
            // Pushing to equipment history
            // for (const item of equipment) {
            //     await equipmentScheme.pushHistory(item, newTask, req.body)
            // }

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

    // Find available equipment for adding to task (function trigger when try to add tasks)
    public getAvailableEquipment = async(req: any): Promise<ServiceResponse> => {
        try {
            const accessToken = req.cookies.accessToken
            
            // Decode access token for get logged contractor id for get equipment from db, If access token didnt exist(because access token created this same request) take data from req.user(assigned from tokenValidation middleware)
            const decoded: any = accessToken ? await decode(accessToken, process.env.ACCESS_TOKEN_SECRET) : req.user

            // Finding available equipments
            const availableEquipment = await equipmentScheme.findAvailableEquipment(decoded._id)
            
            return {
                success: true,
                message: Messages.AVAILABLE_EQUIPMENT_FETCH_SUCCESS,
                data: availableEquipment
            }
            
        } catch (error) {
            console.log(error, Messages.AVAILABLE_EQUIPMENT_FETCH_FAILED)
            return {
                success: false,
                message: Messages.AVAILABLE_EQUIPMENT_FETCH_FAILED
            }
        }
    }

    // Get equipment from task schema to show on 'Project equipment' page
    public getProjectEquipment = async(projectId: any): Promise<ServiceResponse> => {
        try {
            // Finding tasks under project
            const tasks = await taskScheme.getTasks(projectId)

            // Extract all equipment using in the projects(saved in tasks)
            const equipments = extractEquipment(tasks as any)

            return {
                success: true,
                message: Messages.EQUIPMENT_FETCH_SUCCESS,
                data: equipments
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.EQUIPMENT_FETCH_FAILED
            }
        }
    }

    // Controlling equipment actions (use, return)
    public equipmentAction = async(data: any): Promise<ServiceResponse> => {
        try {
            const { taskId, _id, equipmentId, count, status } = data

            const changeStatus = status === "Active" ? "Returned" : "Active"

            // Updating status of equipment saved by tasks
            await taskScheme.updateEquipmentByTask(taskId, _id, changeStatus)
            
            // Updating status of equipment history
            await equipmentScheme.editHistoryStatus(taskId, equipmentId, changeStatus)
            
            if(status === "Active") {
                // Returning equipment from project
                await equipmentScheme.returnEquipment(equipmentId, count)
            } else {
                // Make approve equipment to project
                await equipmentScheme.active(equipmentId, count)
            }

            return {
                success: true,
                message: Messages.EQUIPMENT_ACTION_SUCCESS,
            }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.EQUIPMENT_ACTION_FAILED
            }
        }
    }

    // Changing project status based on the current date
    public changeProjectStatus = async(data: any): Promise<ServiceResponse> => {
        try {
            await projectSchema.editStatus(data._id, data.status)
            return {
                success: true,
                message: Messages.PROJECT_STATUS_UPDATE_SUCCESS,
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.PROJECT_STATUS_UPDATE_FAILURE
            }
        }
    }

    public changeTaskStatus = async(data: any): Promise<ServiceResponse> => {
        try {
            await taskScheme.editStatus(data._id, data.status)
            return {
                success: true,
                message: Messages.TASK_STATUS_UPDATE_SUCCESS
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.TASK_STATUS_UPDATE_FAILURE
            }
        }
    }

    public getSingleTask = async(_id: string): Promise<ServiceResponse> => {
        try {
            const task = await taskScheme.findTaskById(_id)
            return {
                success: true,
                message: Messages.TASK_STATUS_UPDATE_SUCCESS,
                data: task
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.TASK_STATUS_UPDATE_FAILURE
            }
        }
    }

    public checkEquipmentCount = async(data: any): Promise<ServiceResponse> => {
        try {
            const {  equipmentId, count, start, end } = data.data
            const check = await equipmentScheme.equipmentAvalability(equipmentId)
            let totalCount = 0;
            // ഓരോ ദിവസവും iterate ചെയ്യുക
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                let currentDate = new Date(d); // Object mutation ഒഴിവാക്കാൻ copy ചെയ്യുന്നു

                check.activities.forEach((activity: any) => {
                    if (activity.start <= currentDate && activity.end >= currentDate) {
                        totalCount += activity.count;
                    }
                });
            }
            console.log("Total Count:", totalCount);

            return {
                success: true,
                message: Messages.TASK_STATUS_UPDATE_SUCCESS,
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: Messages.TASK_STATUS_UPDATE_FAILURE
            }
        }
    }
}