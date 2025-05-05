interface IEquipment {
    equipmentId: string;
    name: string;
    count: number;
    _id: string;
    status: string;
}

export interface ITask {
    _id: string;
    name: string;
    startingDate: Date;
    endingDate: Date;
    equipment: IEquipment[];  // Ensure correct type here
}

export const extractEquipment = (tasks: ITask[]) => {
  return tasks.flatMap((task) =>
    task.equipment.map((equipment) => ({
      taskName: task.name,
      equipmentId: equipment.equipmentId,
      _id: equipment._id,
      taskId: task._id,
      name: equipment.name,
      count: equipment.count,
      startingDate: task.startingDate,
      endingDate: task.endingDate,
      status: equipment.status,
    }))
  );
};
  
  