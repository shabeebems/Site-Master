import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createAccessToken, deleteToken, findUserByToken } from "../utils/jwt";


export const authenticateToken = async(
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.cookies.accessToken

        if(accessToken) {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err: any, decoded: any) => {
                if(err) {
                    deleteToken(res, 'accessToken')
                    deleteToken(res, 'refreshToken')

                    res.status(406).json({
                        refreshToken: false
                    })
                    
                    return
                }
                next()
            })

        } else {
            const refreshToken = req.cookies.refreshToken

            if(refreshToken) {

                jwt.verify (refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: any, decoded: any) => {
                    if(err) {
                        deleteToken(res, 'accessToken')
                        deleteToken(res, 'refreshToken')
                        res.status(406).json({
                            refreshToken: false
                        })
                        
                        return
                    } else {
                        // Create new access Token
                        const userDetails: any = await findUserByToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                        const payload = { 
                            _id: userDetails._id,
                            email: userDetails.email,
                            role: userDetails.role
                        }
                        await createAccessToken(res, payload)
                        payload._id = payload._id.toString()
                        req.user = payload
                        next()
                    }
                })
            }

        }

    } catch (error) {
        console.log(error)
    }
}