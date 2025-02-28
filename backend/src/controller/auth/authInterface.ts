import { Request, Response } from 'express';

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface IAuthController {
    signup(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    otp(req: Request, res: Response): Promise<void>;
    resendOtp(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}