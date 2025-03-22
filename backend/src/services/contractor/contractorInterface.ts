import { Request, Response } from 'express';

export interface AddWorkerData {
    name: string,
    mobile: string,
    email: string,
    place: string,
}

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

export interface IContractorService {
    addWorker(req: Request, data: object): Promise<ServiceResponse>;
    getWorkers(req: Request, data: AddWorkerData): Promise<ServiceResponse>
}