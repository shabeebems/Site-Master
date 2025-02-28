import bcrypt from 'bcrypt';
import hashedPassword from '../../utils/hashPassword'
import { Response } from 'express';
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
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

const userSchema = new UserRepository()
const otpSchema = new OtpRepository()

export class AuthService implements IAuthService {

    public registerUser = async (data: UserRegistrationData): Promise<ServiceResponse> => {
        try {
            const { password, confirmPassword, email } = data;

            const existingUser = await userSchema.findUserByEmail(email);

            if (existingUser) {
                return { success: false, message: "Email already exists" };
            }

            if (!emailValidation(email)) {
                return { success: false, message: "Enter valid email" };
            }

            if (password.length < 6) {
                return { success: false, message: "Password must be at least 6 characters" };
            }

            if (password !== confirmPassword) {
                return { success: false, message: "Confirm password is incorrect" };
            }

            // Create a random number as otp
            const otp = Math.floor(1000 + Math.random() * 9000) + ''

            // Calling send otp function to sent otp to email
            await sendOtp(email, otp);

            // Store otp to MongoDb
            await otpSchema.createOtp(email, otp)

            return { success: true, message: "Form data validated" };
            
        } catch (error) {

            console.error("Error in registerUser:", error);
            return { success: false, message: "Something went wrong. Please try again." };
        }
    }

    public loginUser = async (data: UserLoginData, res: Response): Promise<ServiceResponse> => {
        const existingUser = await userSchema.findUserByEmail(data.email);

        if (!existingUser) {
            return {
                success: false,
                message: "User not found",
            };
        }

        const checkPassword = await bcrypt.compare(data.password, existingUser.password);

        if (!checkPassword) {
            return {
                success: false,
                message: "Incorrect password",
            };
        }

        const payload = {
            _id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role,
        };

        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);

        res.cookie('accessToken', accessToken, { 
            httpOnly: true,
            secure: false,
            maxAge: 30 * 60 * 1000, // 30 mins
            sameSite: 'strict',
            path: '/'
        });
        
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true,
            secure: false,
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite: 'strict',
            path: '/'
        });

        return {
            success: true,
            message: 'Login successful',
            // data: existingUser,
        };
    }

    public otp = async (data: any): Promise<ServiceResponse> => {
        try {
            const { otp, password, ...rest } = data;
            const findOtp = await otpSchema.findOtp(data.email);
            if (findOtp) {
                if (findOtp.otp === otp) {
                    const hashPassword = await hashedPassword(password)
                    const userData = { ...rest, password: hashPassword, role: 'Contractor' };
                    await userSchema.createUser(userData);
                    await otpSchema.deleteOtp(data.email);
                    return {
                        success: true,
                        message: 'Registration success'
                    };
                }
                return {
                    success: false,
                    message: 'Wrong otp'
                };
            }
            return {
                success: false,
                message: 'Time limit over, resend again'
            };
        } catch (error) {
            console.error('Otp validation error:', error);
            return {
                success: false,
                message: 'Failed to complete Otp validation',
                error: 'SERVER_ERROR'
            };
        }
    }

    public resendOtp = async (email: string): Promise<ServiceResponse> => {
        try {
            await otpSchema.deleteOtp(email);
            const otp = Math.floor(1000 + Math.random() * 9000) + ''

            await sendOtp(email, otp);

            await otpSchema.createOtp(email, otp)
            return {
                success: true,
                message: 'Otp resended'
            };
        } catch (error) {
            console.error('Resend error:', error);
            return {
                success: false,
                message: 'Failed to complete resend otp',
                error: 'SERVER_ERROR'
            };
        }
    }

    public logout = async(res: Response) => {
        try {
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
                message: 'Tokens cleared, Logout successful!'
            }
        } catch (error) {
            console.error('Resend error:', error);
            return {
                success: false,
                message: 'Failed to complete logout',
                error: 'SERVER_ERROR'
            };
        }
    }

}