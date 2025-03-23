export interface IEquipment {
    _id: any;
    tool: string;
    count: number;
    available: number;
    onSite: number;
    contractorId?: any;
}

export interface IEquipmentRepository {
    addEquipment(data: any, _id: any): Promise<IEquipment>;
    findEquipmentByContractorId(_id: any): Promise<IEquipment[]>;
    findAvailableEquipment(_id: any): Promise<IEquipment[]>;
    returnEquipment(_id: any, count: number): Promise<void>;
}