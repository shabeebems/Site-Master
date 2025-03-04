import { Response } from 'express';
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user/userRepository';

interface TokenPayload {
    _id: any;
    email: string;
    role: string;
}

const userSchema = new UserRepository()

export const generateRefreshToken = async (payload : object) : Promise<string> => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: "10d",
        algorithm: 'HS256'
    });
}

export const generateAccessToken = async (payload: TokenPayload) : Promise<string> => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: '30m',
        algorithm: 'HS256'
    });
}

export const deleteToken = async (res: Response ,token: string) => {
    res.clearCookie(token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
    });
}

export const decode = async (token: string, jwtSecret: any) => {
    return jwt.verify(token, jwtSecret);
}

// Find userDetails by jwt token
export const findUserByToken = async (token: string, jwtSecret: any) => {
    const verify: any = jwt.verify(token, jwtSecret);
    const user = await userSchema.findUserByEmail(verify.email)
    return user
}
