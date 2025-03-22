import { Request, Response } from 'express';

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
    
}