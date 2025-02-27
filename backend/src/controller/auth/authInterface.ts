import { Request, Response } from 'express';

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface IAuthController {
    signup(req: Request, res: Response): Promise<any>;
    login(req: Request, res: Response): Promise<any>;
    otp(req: Request, res: Response): Promise<any>;
    resendOtp(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
}