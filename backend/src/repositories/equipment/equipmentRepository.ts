import toolModel from "../../model/toolModel";
import { IEquipment, IEquipmentRepository } from "./equipmentInterface";

export class EquipmentRepository implements IEquipmentRepository {

    public addEquipment = async(data: any, _id: any): Promise<IEquipment> => {
        return await toolModel.create({ ...data, available: data.count, onSite: 0, contractorId: _id })
    }
}