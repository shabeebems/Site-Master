import { Response } from 'express';

export interface UserRegistrationData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}

export interface ServiceResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface IAuthService {
    loginUser(data: UserLoginData, res: Response): Promise<ServiceResponse>;
    registerUser(data: UserRegistrationData): Promise<ServiceResponse>;
    otp(data: any): Promise<ServiceResponse>;
    resendOtp(email: string): Promise<ServiceResponse>;
}