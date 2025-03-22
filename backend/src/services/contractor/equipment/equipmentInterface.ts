export interface ServiceResponse {
    success: boolean
    message: string
    data?: object
}

export interface IEquipmentService {
    addEquipment(req: any, data: any): Promise<ServiceResponse>;
    getEquipment(req: any): Promise<ServiceResponse>;
}