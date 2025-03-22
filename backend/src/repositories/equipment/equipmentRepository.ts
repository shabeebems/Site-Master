import toolModel from "../../model/toolModel";
import { IEquipment, IEquipmentRepository } from "./equipmentInterface";

export class EquipmentRepository implements IEquipmentRepository {

    public addEquipment = async(data: any, _id: any): Promise<IEquipment> => {
        return await toolModel.create({ ...data, available: data.count, onSite: 0, contractorId: _id })
    }

    public findEquipmentByContractorId = async(_id: any): Promise<IEquipment[]> => {
        return await toolModel.find({ contractorId: _id })
    }

    public findAvailableEquipment = async(_id: any): Promise<IEquipment[]> => {
        return await toolModel.aggregate([{ $match: { contractorId: _id, available: { $gt: 0 } } }, { $project: { tool: 1, available: 1 } }])
    }

    public returnEquipment = async(_id: any, count: number): Promise<void> => {
        await toolModel.updateOne({ _id }, { $inc: { available: count, onSite: -count } })
        // return
    }
}