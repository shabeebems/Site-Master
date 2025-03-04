import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { deleteToken, findUserByToken, generateAccessToken } from "../utils/jwt";


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
                    console.log('wrong')
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
            console.log('Middle')
            const refreshToken = req.cookies.refreshToken

            if(refreshToken) {
            console.log('Middle')

                jwt.verify (refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: any, decoded: any) => {
                    if(err) {
                        deleteToken(res, 'accessToken')
                        deleteToken(res, 'refreshToken')
                        console.log('ASES')
                        res.status(406).json({
                            refreshToken: false
                        })
                        
                        return
                    } else {
                        console.log('wert')
                        // Create new access Token
                        const payload: any = await findUserByToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                        const details = { _id: payload._id, email: payload.email, role: payload.role }
                        const accessToken = await generateAccessToken(details);
                        res.cookie('accessToken', accessToken, { 
                            httpOnly: true,
                            secure: false,
                            maxAge: 30 * 60 * 1000, // 30 mins
                            sameSite: 'strict',
                            path: '/'
                        });
                        console.log('Middle')
                        details._id = details._id.toString()
                        req.user = details
                        next()
                    }
                })
            }

        }

        // if(!accessToken) {

        //     console.log('No access token, waiting for creation with refresh token')

        //     const refreshToken = req.cookies.refreshToken
        //     if(!refreshToken) {
        //         console.log('No refresh, logout')
        //     } else {
        //         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
        //             if(err) {
        //                 console.log('No valid refresh token, Exit')
        //             } else {
        //                 console.log('Refresh token valid, creating new access token.')
        //                 next()
        //             }
        //         })
        //     }
        //     next()

        // } else {
            
        //     jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err: any, decoded: any) => {
        //         if(err) {
        //             console.log('No valid access token, Exit')
        //         } else {
        //             console.log('Valid access, Success go next')
        //             next()
        //         }
        //     })

        // }

    } catch (error) {
        console.log(error)
    }
}