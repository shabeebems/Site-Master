import { NextFunction, Response } from 'express';

export interface UserRegistrationData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLoginData {
    email: string;
    password: string;
    role: string;
}

export interface IOtpData {
    name: string;
    email: string;
    password: string;
    otp: string;
}

export interface ServiceResponse<T = any> {
    success: boolean;
    message: string;
    error?: string;
    data?: T;
}

export interface IAuthService {
    registerUser(data: UserRegistrationData): Promise<ServiceResponse>;
    otp(data: IOtpData): Promise<ServiceResponse>;
    resendOtp(email: string): Promise<ServiceResponse>;
    loginUser(data: UserLoginData, res: Response, next: NextFunction): Promise<ServiceResponse>;
    logout(res: Response): Promise<ServiceResponse>;
    forgetPassword(email: string, role: string): Promise<ServiceResponse>;
    checkGoogleAuth(res: Response, email: string, name: string): Promise<ServiceResponse>;
}