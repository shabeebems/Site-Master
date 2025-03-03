import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authenticateToken = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.cookies.accessToken
        if(accessToken) {
            console.log('Access')
        }
        const refreshToken = req.cookies.refreshToken
        if(refreshToken) {
            console.log('refresh')
        }
        next()
    } catch (error) {
        console.log(error)
    }
}