import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/authService';
import { AuthResponse, IAuthController } from './authInterface';
import { Messages } from '../../constants/messageConstants';

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

            console.error(Messages.REGISTER_CONTROLLER_ERROR, error);

            res.status(500).json({
                success: false,
                message: Messages.REGISTRATION_FAILED,
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

            console.error(Messages.OTP_SERVER_ERROR, error);
            
            res.status(500).json({
                success: false,
                message: Messages.OTP_SERVER_ERROR,
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

            console.error(Messages.OTP_RESEND_SERVER_ERROR, error);

            res.status(500).json({
                success: false,
                message: Messages.OTP_RESEND_SERVER_ERROR,
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

            console.error(Messages.LOGIN_SERVER_ERROR, error);

            res.status(500).json({
                success: false,
                message: Messages.LOGIN_SERVER_ERROR
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

            console.error(Messages.LOGOUT_SERVER_ERROR, error);
            
            res.status(500).json({
                success: false,
                message: Messages.LOGOUT_SERVER_ERROR,
            });
        }
    }

    public forgetPassword = async(req: Request, res: Response): Promise<void> => {
        try {
            
            const { email, role } = req.body

            // -- Calling the forget password service to update password
            const response: AuthResponse = await authService.forgetPassword(email, role);
            
            const { success, message } = response

            res.status(201).json({
                success,
                message
            });
            return;

        } catch (error) {

            console.error(Messages.RESET_PASSWORD_FAILED, error);
            
            res.status(500).json({
                success: false,
                message: Messages.RESET_PASSWORD_FAILED,
            });
        }
    }

    public checkGoogleAuth = async(req: Request, res: Response): Promise<void> => {
        try {
            
            const { email, name } = req.body

            // -- Calling the forget password service to update password
            const response: AuthResponse = await authService.checkGoogleAuth(email, name);
            
            const { success, message } = response

            res.status(201).json({
                success,
                message
            });
            return;

        } catch (error) {

            console.error(Messages.RESET_PASSWORD_FAILED, error);
            
            res.status(500).json({
                success: false,
                message: Messages.RESET_PASSWORD_FAILED,
            });
        }
    }
    
}

