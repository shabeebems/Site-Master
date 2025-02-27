import { Request, Response } from 'express';

export interface AddUserData {
    name: string,
    mobile: string,
    email: string,
    place: string
}

export interface ServiceResponse {
    success: boolean
    message: string
    data?: object
}

export interface IContractorService {
    addWorker(req: Request, data: object): Promise<ServiceResponse>;
    getWorkers(req: Request, data: AddUserData): Promise<ServiceResponse>
}