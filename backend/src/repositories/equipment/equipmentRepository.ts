import equipmentHistory from "../../model/equipmentHistory";
import toolModel from "../../model/toolModel";
import { IEquipment, IEquipmentRepository } from "./equipmentInterface";

export class EquipmentRepository implements IEquipmentRepository {

    public addEquipment = async(data: any, _id: any): Promise<IEquipment> => {
        return await toolModel.create({ ...data, available: data.count, onSite: 0, contractorId: _id })
    }

    public findAllEquipmentByContractorId = async(contractorId: any): Promise<IEquipment[]> => {
        return await toolModel.find({ contractorId })
    }

    public findEquipmentByContractorId = async(_id: any, limit: number, itemsPerPage: number): Promise<IEquipment[]> => {
        return await toolModel.aggregate([{ $match: { contractorId: _id } }, { $skip: (limit * itemsPerPage) }, { $limit: (itemsPerPage * 1) }])
    }

    public findEquipmentCount = async (_id: string): Promise<number> => {
        return await toolModel.countDocuments({ contractorId: _id });
    }

    public findEquipmentById = async(_id: any): Promise<IEquipment | any> => {
        return await toolModel.findOne({  _id })
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

    public pushHistory = async(data: any, task: any): Promise<any> => {
        return equipmentHistory.updateOne({ equipmentId: data.equipmentId }, {
            $push: {
                activities: {
                    taskId: task._id,
                    task: task.name,
                    projectId: task.projectId,
                    project: task.project,
                    start: task.startingDate,
                    end: task.endingDate,
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

    public findEquipmentHistoryByEquipmentId = async(equipmentId: any): Promise<any> => {
        return await equipmentHistory.findOne({ equipmentId })
    }

}