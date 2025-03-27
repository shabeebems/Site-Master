import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createAccessToken, deleteToken } from "../utils/jwt";
import { UserRepository } from "../repositories/user/userRepository";
import { Messages } from "../constants/messageConstants";

const userSchema = new UserRepository()

export const authenticateToken = async(
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.cookies.accessToken

        const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET } = process.env
        if(accessToken) {
            // Verify access token
            jwt.verify(accessToken, ACCESS_TOKEN_SECRET as string, async(err: any, decoded: any) => {
                if(err) {
                    // If didnt verify delete access and refresh token
                    deleteToken(res, 'accessToken')
                    deleteToken(res, 'refreshToken')

                    // Pass error 406 to remove localStorage (Frontend validation in redux, and redux is persist, persist details are stored in local storage)
                    res.status(406).json({
                        success: false,
                        message: Messages.ACCESS_TOKEN_INVALID
                    })
    
                    return
                }

                const userDetails: any = await userSchema.findUserByToken(accessToken, ACCESS_TOKEN_SECRET || '')
                
                if(userDetails.is_block) {
                    
                    // If user blocked, delete access and refresh token
                    deleteToken(res, 'accessToken')
                    deleteToken(res, 'refreshToken')

                    res.status(406).json({
                        success: false,
                        message: Messages.BLOCK_USER
                    })

                    return
                }
                
                next()
            })

        } else {
            // If no Access Token
            const refreshToken = req.cookies.refreshToken

            if(refreshToken) {
                // Verify refresh token
                jwt.verify (refreshToken, REFRESH_TOKEN_SECRET as string, async (err: any, decoded: any) => {
                    if(err) {
                        // If didnt verify delete access and refresh token
                        deleteToken(res, 'accessToken')
                        deleteToken(res, 'refreshToken')

                        // Pass error 406 to remove local Storage (Frontend validation in redux, and redux is persist, persist details are stored in local storage)
                        res.status(406).json({
                            success: false,
                            message: Messages.REFRESH_TOKEN_INVALID
                        })
                        
                        return

                    } else {

                        // Creating new access Token
                        // Finding user details by refresh token to payload for create access token
                        const userDetails: any = await userSchema.findUserByToken(refreshToken, REFRESH_TOKEN_SECRET || '')
                        
                        if(userDetails.is_block) {

                            // If user blocked, delete refresh token
                            deleteToken(res, 'refreshToken')

                            res.status(406).json({
                                success: false,
                                message: Messages.BLOCK_USER
                            })
        
                            return
                        }

                        const { _id, email, role } = userDetails

                        const payload = { 
                            _id,
                            email,
                            role
                        }

                        // Creating new access token
                        await createAccessToken(res, payload)

                        // Change ObjectId to String to get details in this same request(accessToken only available next request)
                        payload._id = payload._id.toString()

                        // For access details in ths same request, because access token is created in this same request(accessToken only available next request).
                        req.user = payload

                        next()
                    }
                })

            } else {
                res.status(406).json({
                    success: false,
                    message: Messages.NO_TOKEN
                })
                return
            }

        }

    } catch (error) {
        console.log(error)
    }
}