export interface AddProject {
    name: string,
    location: string,
    startingDate: string,
    endingDate: string,
    image: string
}

export interface ServiceResponse {
    success: boolean
    message: string
    data?: object
}

export interface IProjectService {
    newProject(req: any, data: AddProject): Promise<ServiceResponse>;
    getProjects(req: any): Promise<ServiceResponse>;
    getSingleProject(_id: string): Promise<ServiceResponse>;
    addTask(req: any): Promise<ServiceResponse>;
    getAvailableEquipment(req: any): Promise<ServiceResponse>;
    getTaskEquipment(projectId: any): Promise<ServiceResponse>;
    returnEquipment(data: any): Promise<ServiceResponse>;
    changeProjectStatus(data: any): Promise<ServiceResponse>;
}