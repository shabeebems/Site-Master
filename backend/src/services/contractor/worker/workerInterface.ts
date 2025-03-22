export interface AddWorkerData {
    name: string,
    mobile: string,
    email: string,
    place: string,
}

export interface ServiceResponse {
    success: boolean
    message: string
    data?: object
}

export interface IWorkerService {
    addWorker(req: Request, data: object): Promise<ServiceResponse>;
    getWorkers(req: Request, data: AddWorkerData): Promise<ServiceResponse>
}