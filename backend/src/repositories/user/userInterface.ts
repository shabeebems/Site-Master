export interface IUser {
    _id: any;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    is_admin: boolean;
    role: string;
    contractorId?: any;
}

export interface IUserRepository {
    createUser(userData: object): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser | null>
}