import projectModel from "../../model/projectModel"
import { IProjectRepository, IPtoject } from "./projectInterface"

export class ProjectRepository implements IProjectRepository {

    public addProject = async(data: object): Promise<IPtoject> => {
        return await projectModel.create(data)
    }

    public getProjects = async(contractorId: any, limit: number, itemsPerPage: number): Promise<IPtoject[]> => {
        return await projectModel.aggregate([{ $match: { contractorId } }, { $sort: { _id: -1 } }, { $skip: (limit * itemsPerPage) }, { $limit: (itemsPerPage * 1) }])
    }

    public findProjectsCount = async (contractorId: string): Promise<number> => {
        return await projectModel.countDocuments({ contractorId });
    }

    public findProjectById = async(_id: any): Promise<IPtoject | null> => {
        return await projectModel.findOne({ _id })
    }

    public editStatus = async(_id: string, status: string): Promise<void> => {
        await projectModel.updateOne({ _id }, { $set: { status } })
    }
}