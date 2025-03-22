import bcrypt from 'bcrypt';
import hashedPassword from '../../utils/hashPassword'
import { Response } from 'express';
import { createAccessToken, createRefreshToken } from "../../utils/jwt";
import sendPassword from "../../utils/sendPassword";
import sendOtp from "../../utils/sendOtp";
import { UserRepository } from '../../repositories/user/userRepository';
import { OtpRepository } from '../../repositories/otp/otpRepository';
import { emailValidation } from '../../utils/emailValidation';
import { 
    IAuthService, 
    UserLoginData, 
    UserRegistrationData, 
    ServiceResponse
} from './authInterfaces';
import { Messages } from '../../constants/messageConstants';

const userSchema = new UserRepository()
const otpSchema = new OtpRepository()

export class AuthService implements IAuthService {

    public registerUser = async (data: UserRegistrationData): Promise<ServiceResponse> => {
        try {
            const { password, confirmPassword, email } = data;

            const existingUser = await userSchema.findUserByEmail(email);

            if (existingUser) {
                return { success: false, message: Messages.EMAIL_ALREADY_EXISTS };
            }

            if (!emailValidation(email)) {
                return { success: false, message: Messages.INVALID_EMAIL };
            }

            if (password.length < 6) {
                return { success: false, message: Messages.PASSWORD_TOO_SHORT };
            }

            if (password !== confirmPassword) {
                return { success: false, message: Messages.WRONG_CONFIRM_PASSWORD };
            }

            // Create a random number as otp
            const otp = Math.floor(1000 + Math.random() * 9000) + ''

            // Calling send otp function to sent otp to email
            await sendOtp(email, otp);

            // Store otp to MongoDb
            await otpSchema.createOtp(email, otp)

            return { success: true, message: Messages.FORM_VALIDATION_SUCCESS };
            
        } catch (error) {

            console.error("Error in registerUser:", error);
            return { success: false, message: Messages.REGISTRATION_FAILED };
        }
    }

    public otp = async (data: any): Promise<ServiceResponse> => {
        try {
            const { otp, password, ...rest } = data;

            const findOtp = await otpSchema.findOtp(data.email);

            if (findOtp) {
                if (findOtp.otp === otp) {

                    // Password hashing
                    const hashPassword = await hashedPassword(password)

                    // Extract user details from data and add some details
                    const userData = { ...rest, password: hashPassword, role: 'Contractor' };

                    // Create new User
                    await userSchema.createUser(userData);

                    // Delete Exissting otp
                    await otpSchema.deleteOtp(data.email);

                    return {
                        success: true,
                        message: Messages.REGISTRATION_SUCCESS
                    };
                }

                return {
                    success: false,
                    message: Messages.INVALID_OTP
                };
            }

            return {
                success: false,
                message: Messages.OTP_TIME_LIMIT_EXCEEDED
            };

        } catch (error) {

            console.error(Messages.OTP_VERIFICATION_FAILED, error);
            return {
                success: false,
                message: Messages.OTP_VERIFICATION_FAILED,
                error: 'SERVER_ERROR'
            };
        }
    }

    public resendOtp = async (email: string): Promise<ServiceResponse> => {
        try {
            // Delete otp before resending, if exists
            await otpSchema.deleteOtp(email);

            const otp = Math.floor(1000 + Math.random() * 9000) + ''

            // Call senOtp function
            await sendOtp(email, otp);

            // Save new otp to MongoDb
            await otpSchema.createOtp(email, otp)

            return {
                success: true,
                message: Messages.OTP_RESENT
            };

        } catch (error) {
            console.error('Resend error:', error);
            return {
                success: false,
                message: Messages.FAILED_TO_RESEND_OTP,
                error: 'SERVER_ERROR'
            };
        }
    }

    public loginUser = async (data: UserLoginData, res: Response): Promise<ServiceResponse> => {
        // These code for contractor and worker login
        try {
            const existingUser = await userSchema.findUserByEmail(data.email);

            if (!existingUser) {
                return {
                    success: false,
                    message: Messages.USER_NOT_FOUND,
                };
            }

            const { _id, email, password, role } = existingUser

            // Check login user role and exist user role
            // Managing, if worker logged with contractor details or Ulta(reverse)
            if(role !== data.role) {
                return {
                    success: false,
                    message: `You are not ${data.role}, go to ${role} page`,
                };
            }

            // Campare input password and db stored password
            const checkPassword = await bcrypt.compare(data.password, password);

            if (!checkPassword) {
                return {
                    success: false,
                    message: Messages.INCORRECT_PASSWORD,
                };
            }

            if (existingUser.is_block) {
                return {
                    success: false,
                    message: Messages.BLOCK_USER,
                };
            }

            // Create payload to create tokens
            const payload = {
                _id: _id,
                email: email,
                role: role,
            };

            // Generate tokens and create tokens
            await createAccessToken(res, payload)
            await createRefreshToken(res, payload)

            return {
                success: true,
                message: Messages.LOGIN_SUCCESS,
                data: existingUser,
            };

        } catch (error) {

            console.error('Login error:', error);
            return {
                success: false,
                message: Messages.LOGIN_VERIFICATION_FAILED,
                error: 'SERVER_ERROR'
            };

        }
    }

    public logout = async(res: Response): Promise<ServiceResponse> => {
        try {

            // Clear cookies
            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/'
            });
    
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/'
            });

            return {
                success: true,
                message: Messages.LOGOUT_SUCCESS
            }

        } catch (error) {

            console.error(Messages.LOGOUT_FAILED, error);
            return {
                success: false,
                message: Messages.LOGOUT_FAILED,
                error: 'SERVER_ERROR'
            };
            
        }
    }

    public forgetPassword = async(email: string, role: string): Promise<ServiceResponse> => {
        try {
            const existingUser = await userSchema.findUserByEmail(email);

            if (!existingUser) {
                return {
                    success: false,
                    message: Messages.USER_NOT_FOUND,
                };
            }

            if(existingUser.role !== role) {
                return {
                    success: false,
                    message: `you are not ${role}, go to ${existingUser.role} page`,
                };
            }

            // Create a random password to sent contractor email
            const password = Math.floor(100000 + Math.random() * 900000);

            const hashPassword = await hashedPassword(password + '')

            if(hashPassword) {
                // Update new password after hashing
                userSchema.changePasswordByEmail(email, hashPassword)
            }

            // Send password and email to contractor's email
            sendPassword(email, password + '')

            return {
                success: true,
                message: Messages.RESET_PASSWORD_SUCCESS,
            };

        } catch (error) {
            console.error(Messages.RESET_PASSWORD_FAILED, error);
            return {
                success: false,
                message: Messages.RESET_PASSWORD_FAILED,
                error: 'SERVER_ERROR'
            };
        }
    }

    public checkGoogleAuth = async(res: Response, email: string, name: string): Promise<ServiceResponse> => {
        try {
            // Finding users with email
            let existingUser = await userSchema.findUserByEmail(email);

            // If user didn't exists, creating new user
            if(!existingUser) {

                // Create a random password to sent contractor's email
                const password = Math.floor(100000 + Math.random() * 900000);
                const hashPassword = await hashedPassword(password + '')

                // Send password and email to contractor's email
                sendPassword(email, password + '')

                const newUser = {
                    name,
                    email,
                    password: hashPassword,
                    role: 'Contractor'
                }

                // Creating new user
                existingUser = await userSchema.createUser(newUser)

            }

            const { _id, role } = existingUser

            // Create payload to create tokens
            const payload = {
                _id,
                email,
                role,
            };

            // Generate tokens and create tokens
            await createAccessToken(res, payload)
            await createRefreshToken(res, payload)

            return {
                success: true,
                message: Messages.GOOGLE_AUTH_SUCCESS,
                data: existingUser
            };

        } catch (error) {
            console.error(Messages.GOOGLE_AUTH_FAILED, error);
            return {
                success: false,
                message: Messages.GOOGLE_AUTH_FAILED,
                error: 'SERVER_ERROR'
            };
        }
    }

}