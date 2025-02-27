import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/authService';
import { AuthResponse, IAuthController } from './authInterface';

const authService = new AuthService()

export class AuthController implements IAuthController {

    public signup = async (req: Request, res: Response): Promise<any> => {
        
        try {
            const result: AuthResponse = await authService.registerUser(req.body);
        
            if (!result.success) {
                return res.status(404).json({
                    success: false,
                    message: result.message,
                });
            }
        
            return res.status(201).json({
                success: true,
                message: result.message,
            });
        } catch (error) {
            console.error("Unexpected error in register controller:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error. Please try again later.",
            });
        }
    }


    public login = async (req: Request, res: Response): Promise<any> => {
        try {
            const result: AuthResponse = await authService.loginUser(req.body, res);

            return res.status(201).json({
                success: result.success,
                message: result.message,
                data: result.data || null
            });
        } catch (error) {
            console.error("Login error:", error);

            return res.status(500).json({
                success: false,
                message: 'An unexpected error occurred during signup',
                data: null
            });
        }
    }    

    public otp = async (req: Request, res: Response): Promise<any> => {
        try {
            const result: AuthResponse | undefined = await authService.otp(req.body);
                return res.status(201).json({
                    success: result.success,
                    message: result.message
                    // data: result.data || null
                });
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                success: false,
                message: 'An unexpected error occurred during otp verification',
                data: null
            });
        }
    } 
    
    public resendOtp = async (req: Request, res: Response): Promise<any> => {
        try {
            const response: AuthResponse = await authService.resendOtp(req.body.email);
            const {message,success,data} = response
            return res.status(201).json({
                success: response.success,
                message: response.message
            });
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                success: false,
                message: 'An unexpected error occurred during resending otp',
                data: null
            });
        }
    }

    public logout = async(req: Request, res: Response): Promise<any> => {
        try {
            const response: AuthResponse = await authService.logout(res);
            
            const { success, message } = response

            return res.status(201).json({
                success,
                message
            });

        } catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while logging out',
            });
        }
    }
    
    
    
}

