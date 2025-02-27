export interface IEquipment {
    tool: string;
    count: number;
    available: number;
    onSite: number;
    contractorId?: any;
}

export interface IEquipmentRepository {
    addEquipment(data: any, _id: any): Promise<IEquipment>;
}