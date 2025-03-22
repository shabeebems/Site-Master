export interface IPtoject {
    name: string;
    location: string;
    startingDate: Date;
    endingDate: Date;
    contractorId?: any;
    status: string;
}

export interface IProjectRepository {
    addProject(data: object): Promise<IPtoject>;
    getProjects(_id: any): Promise<IPtoject[]>;
    findProjectById(_id: any): Promise<IPtoject | null>;
    editStatus(_id: string, status: string): Promise<void>;
}