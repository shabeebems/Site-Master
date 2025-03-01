import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/authService';
import { AuthResponse, IAuthController } from './authInterface';

const authService = new AuthService()

export class AuthController implements IAuthController {

    public signup = async (req: Request, res: Response): Promise<void> => {
        
        try {
            // -- Calling the registerUser to check register details
            const result: AuthResponse = await authService.registerUser(req.body);

            const { success, message } = result
            
            if (!success) {
                res.status(404).json({
                    success,
                    message
                });
                return
            }
        
            res.status(201).json({
                success,
                message
            });
            
        } catch (error) {

            console.error("Unexpected error in register controller:", error);

            res.status(500).json({
                success: false,
                message: "Internal server error. Please try again later.",
            }); 
        }
    }

    public otp = async (req: Request, res: Response): Promise<void> => {
        try {
            // -- Calling the otp service to check otp credentials
            const result: AuthResponse | undefined = await authService.otp(req.body);

            const { success, message } = result

            res.status(201).json({
                success,
                message
            });
            return;

        } catch (error) {

            console.error("Otp error:", error);
            
            res.status(500).json({
                success: false,
                message: 'An unexpected error occurred during otp verification',
                data: null
            });
        }
    } 
    
    public resendOtp = async (req: Request, res: Response): Promise<void> => {
        try {
            // -- Calling the resend otp service to resent otp with email
            const response: AuthResponse = await authService.resendOtp(req.body.email);

            const { message, success } = response

            res.status(201).json({
                success,
                message
            });
            return;

        } catch (error) {

            console.error("Resend otp error:", error);

            res.status(500).json({
                success: false,
                message: 'An unexpected error occurred during resending otp',
                data: null
            });
            return;
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            // -- Calling the loginUser to check login credentials
            const result: AuthResponse = await authService.loginUser(req.body, res);

            const { success, message, data } = result

            res.status(201).json({
                success, 
                message,
                data
            });
            return
            
        } catch (error) {

            console.error("Login error:", error);

            res.status(500).json({
                success: false,
                message: 'An unexpected error occurred during login'
            });
        }
    }; 

    public logout = async(req: Request, res: Response): Promise<void> => {
        try {
            // -- Calling the logout service to logout and remove tokens
            const response: AuthResponse = await authService.logout(res);
            
            const { success, message } = response

            res.status(201).json({
                success,
                message
            });
            return;

        } catch (error) {

            console.error('Logout error:', error);
            
            res.status(500).json({
                success: false,
                message: 'An error occurred while logging out',
            });
        }
    }
    
}

