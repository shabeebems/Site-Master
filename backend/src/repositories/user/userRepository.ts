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

    public findUserBy_id = async (_id: string): Promise<IUser | null> => {
        return await User.findOne({ _id }, { name: 1, email: 1, mobile: 1, place: 1, role: '$profession', image: 1 })
    }

    public changePasswordByEmail = async (email: string, password: string): Promise<void> => {
        await User.updateOne({ email }, { password })
    }

    public findWorkersByContractorId = async (_id: string, limit: number, itemsPerPage: number): Promise<IUser[]> => {
        return await User.aggregate([{ $match: { contractorId: _id } }, { $sort: { _id: -1 } }, { $skip: (limit * itemsPerPage) }, { $limit: (itemsPerPage * 1) }, { $project: { name: 1, email: 1, mobile: 1, place: 1, profession: 1, image: 1 } }])
    }

    public findWorkersCount = async (_id: string): Promise<number> => {
        return await User.countDocuments({ contractorId: _id });
    }

    public findUserByToken = async (token: string, jwtSecret: string): Promise<IUser | null> => {
        const verify: any = jwt.verify(token, jwtSecret);
        return await this.findUserByEmail(verify.email)
    }

    public findworkerRoles = async (contractorId: string): Promise<any> => {
        const result = await User.aggregate([{ $match: { contractorId } }, { $group: { _id: "$profession" } }])
        return result.map(item => item._id);
    }

    public findworkerBasedOnRoles = async (contractorId: string, profession: string): Promise<any> => {
        return await User.find({ contractorId, profession }, { name: 1 })
    }

    public addImage = async (_id: string, image: string): Promise<any> => {
        return await User.updateOne({ _id }, { image })
    }

}

