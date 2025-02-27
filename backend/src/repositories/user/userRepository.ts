import User from '../../model/userModel'
import { IUser, IUserRepository } from './userInterface'



export class UserRepository implements IUserRepository {

    public createUser = async (userData: object): Promise<IUser> => {
        return await User.create({ ...userData, is_admin: false })
    }

    public findUserByEmail = async (email: string): Promise<IUser | null> => {
        return await User.findOne({ email })
    }

    public findWorkersByContractorId = async (_id: string): Promise<any | null> => {
        return await User.aggregate([{ $match: { contractorId: _id } }, { $project: { _id: 0, name: 1, email: 1, mobile: 1, place: 1 } }])
    }

}

