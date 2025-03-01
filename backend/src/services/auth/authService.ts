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
                    message: `You are not ${role == 'Contractor' ? 'worker' : 'contractor'}`,
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

            // Create payload to create tokens
            const payload = {
                _id: _id,
                email: email,
                role: role,
            };

            // Generate tokens
            const accessToken = await generateAccessToken(payload);
            const refreshToken = await generateRefreshToken(payload);

            // Save accessToken to cookie
            res.cookie('accessToken', accessToken, { 
                httpOnly: true,
                secure: false,
                maxAge: 30 * 60 * 1000, // 30 mins
                sameSite: 'strict',
                path: '/'
            });
            
            // Save refreshToken to cookie
            res.cookie('refreshToken', refreshToken, { 
                httpOnly: true,
                secure: false,
                maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
                sameSite: 'strict',
                path: '/'
            });

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

    public logout = async(res: Response) => {
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

            console.error('Resend error:', error);
            return {
                success: false,
                message: Messages.LOGOUT_FAILED,
                error: 'SERVER_ERROR'
            };
            
        }
    }

}