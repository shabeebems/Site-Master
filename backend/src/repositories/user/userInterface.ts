import { Types } from "mongoose";

export interface IUser {
    _id: string | Types.ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    is_admin: boolean;
    is_block: boolean;
    role: string;
    contractorId?: any;
    image?: any;
}

export interface IUserRepository {
    createUser(userData: object): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser | null>;
    findWorkersByContractorId(_id: string): Promise<IUser | null>;
}