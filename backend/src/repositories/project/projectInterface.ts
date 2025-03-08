export interface IPtoject {
    name: string;
    location: string;
    startingDate: Date;
    endingDate: Date;
    status: string;
    contractorId?: any;
}

export interface IProjectRepository {
    addProject(data: object): Promise<IPtoject>;
}