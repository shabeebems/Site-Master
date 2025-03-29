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
    getProjectEquipment(projectId: any): Promise<ServiceResponse>;
    equipmentAction(data: any): Promise<ServiceResponse>;
    changeProjectStatus(data: any): Promise<ServiceResponse>;
    changeTaskStatus(data: any): Promise<ServiceResponse>;
    getSingleTask(_id: string): Promise<ServiceResponse>;
    checkEquipmentCount(data: any): Promise<ServiceResponse>;
    taskEquipmentAdd(equipment: any, taskId: any): Promise<ServiceResponse>;
    getWorkerRoles(req: any): Promise<ServiceResponse>;
    getWorkerToAddTask(req: any): Promise<ServiceResponse>;
    taskWorkerAdd(req: any): Promise<ServiceResponse>;

}