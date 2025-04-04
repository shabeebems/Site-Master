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
    createUser(userData: IUser): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser | null>;
    changePasswordByEmail(email: string, password: string): Promise<void>;
    findWorkersByContractorId(_id: string, currentPage: number, itemsPerPage: number): Promise<IUser[]>;
    findUserByToken(token: string, jwtSecret: string): Promise<IUser | null>;
}