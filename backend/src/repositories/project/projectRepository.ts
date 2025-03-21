import projectModel from "../../model/projectModel"
import { IProjectRepository, IPtoject } from "./projectInterface"

export class ProjectRepository implements IProjectRepository {

    public addProject = async(data: object): Promise<IPtoject> => {
        return await projectModel.create(data)
    }

    public getProjects = async(contractor_id: any): Promise<any | undefined> => {
        return await projectModel.find({ contractorId: contractor_id })
    }

    public findProjectById = async(_id: any): Promise<any | undefined> => {
        return await projectModel.findOne({ _id })
    }

    public editStatus = async(_id: string, status: string): Promise<void> => {
        const a = await projectModel.updateOne({ _id }, { $set: { status } })
        console.log(a)
    }
}