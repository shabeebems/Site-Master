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
            jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
                if(err) {
                    console.log('ee')
                    res.json({
                        refreshToken: false
                    })
                    return
                } else {
                    console.log('oo')
                    res.json({
                        refreshToken: true
                    })
                }
            })
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