export interface IEquipment {
    tool: string;
    count: number;
    available: number;
    onSite: number;
}

export interface IEquipmentRepository {
    addEquipment(data: any, _id: any): Promise<IEquipment>;
}