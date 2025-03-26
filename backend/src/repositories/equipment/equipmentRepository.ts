import equipmentHistory from "../../model/equipmentHistory";
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
        return await toolModel.aggregate([{ $match: { contractorId: _id, count: { $gt: 0 } } }])
    }

    public returnEquipment = async(_id: any, count: number): Promise<void> => {
        await toolModel.updateOne({ _id }, { $inc: { available: count, onSite: -count } })
        // return
    }

    public active = async(_id: any, count: number): Promise<void> => {
        await toolModel.updateOne({ _id }, { $inc: { available: -count, onSite: count } })
        // return
    }

    public createHistory = async(equipmentId: any): Promise<void> => {
        await equipmentHistory.create({ equipmentId })
        // return
    }

    public pushHistory = async(data: any, ids: any, body: any): Promise<any> => {
        return equipmentHistory.updateOne({ equipmentId: data.equipmentId }, {
            $push: {
                activities: {
                    taskId: ids._id,
                    projectId: ids.projectId,
                    start: body.startingDate,
                    end: body.endingDate,
                    count: data.count,
                    status: 'Pending'
                }
            }
        })
    }

    public editHistoryStatus = async(taskId: any, equipmentId: any, status: string): Promise<void> => {
        await equipmentHistory.updateOne({
            _id: equipmentId, 
            'activities.taskId': taskId
        }, {
            $set: { 'activities.$.status': status }
        })
        return
    }

    public equipmentAvalability = async(equipmentId: any): Promise<any> => {
        return await equipmentHistory.findOne({ equipmentId })
    }

}