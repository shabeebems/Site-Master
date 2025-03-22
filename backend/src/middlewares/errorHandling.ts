// import { NextFunction, Request, Response } from "express";
// import { CustomError } from "../errors/customError";

// export const errorHandling = (error: Error, req: Request, res: Response, next: NextFunction) => {
//     if(error instanceof CustomError) {
//         console.log('aaaa')
//         res.status(error.statusCode).send(error.message)
//         return
//     }
//     res.status(400).send('Something went wrong')

// }