import { Response } from 'express';
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user/userRepository';

interface TokenPayload {
    _id: any;
    email: string;
    role: string;
}

const userSchema = new UserRepository()

export const deleteToken = async (res: Response ,token: string) => {
    res.clearCookie(token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
    });
}

export const createAccessToken = async (res: Response , payload: any) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: '30m',
        algorithm: 'HS256'
    });
    res.cookie('accessToken', accessToken, { 
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000, // 30 mins
        sameSite: 'strict',
        path: '/'
    });
}

export const createRefreshToken = async (res: Response , payload: any) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: "10d",
        algorithm: 'HS256'
    });
    res.cookie('refreshToken', refreshToken, { 
        httpOnly: true,
        secure: false,
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        sameSite: 'strict',
        path: '/'
    });
}

export const decode = async (token: string, jwtSecret: any) => {
    return jwt.verify(token, jwtSecret);
}

