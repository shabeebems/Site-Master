import projectModel from "../../model/projectModel"
import { IProjectRepository, IPtoject } from "./projectInterface"

export class ProjectRepository implements IProjectRepository {

    public addProject = async(data: object): Promise<IPtoject> => {
        return await projectModel.create(data)
    }

    public getProjects = async(_id: any): Promise<any | undefined> => {
        return await projectModel.find({ contractorId: _id })
    }

}