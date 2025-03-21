import User from '../../model/userModel'
import { IUser, IUserRepository } from './userInterface'
import jwt from "jsonwebtoken";

export class UserRepository implements IUserRepository {

    public createUser = async (userData: object): Promise<IUser> => {
        return await User.create({ ...userData })
    }

    public findUserByEmail = async (email: string): Promise<IUser | null> => {
        return await User.findOne({ email })
    }

    public changePasswordByEmail = async (email: string, password: string): Promise<void> => {
        await User.updateOne({ email }, { password })
    }

    public findWorkersByContractorId = async (_id: string): Promise<IUser[]> => {
        return await User.aggregate([{ $match: { contractorId: _id } }, { $project: { _id: 0, name: 1, email: 1, mobile: 1, place: 1 } }])
    }

    public findUserByToken = async (token: string, jwtSecret: string): Promise<IUser | null> => {
        const verify: any = jwt.verify(token, jwtSecret);
        return await this.findUserByEmail(verify.email)
    }

}

