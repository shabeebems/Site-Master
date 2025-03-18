import React, { useState } from 'react'

interface Equipment {
    name: string;
    count: number;
}

interface ProjectModalProps {
    closeModal: () => void;
}

const AddTask = ({closeModal}: ProjectModalProps) => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [workers, setWorkers] = useState<string[]>([]);
    const [equipmentName, setEquipmentName] = useState<string>("");
    const [equipmentCount, setEquipmentCount] = useState<string>("");
    const [workerName, setWorkerName] = useState<string>("");
  
    const addEquipment = () => {
        if (equipmentName && equipmentCount) {
            setEquipment([...equipment, { name: equipmentName, count: Number(equipmentCount) }]);
            setEquipmentName("");
            setEquipmentCount("");
          }
    };

    const removeEquipment = (index: number) => {
        setEquipment(equipment.filter((_, i) => i !== index));
    };
  
    const addWorker = () => {
      if (workerName) {
        setWorkers([...workers, workerName]);
        setWorkerName("");
      }
    };

    const removeWorker = (index: number) => {
        setWorkers(workers.filter((_, i) => i !== index));
    };
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl space-y-5 max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
                
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Task Name</label>
                    <input type="text" placeholder="Enter task name" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Starting Date</label>
                    <input type="date" min={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Ending Date</label>
                    <input type="date" min={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Equipment */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Equipment</label>
                    <div className="flex gap-2">
                        <input type="text" value={equipmentName} onChange={(e) => setEquipmentName(e.target.value)} placeholder="Equipment name" className="w-2/3 border border-gray-300 rounded-lg p-2" />
                        <input type="number" value={equipmentCount} onChange={(e) => setEquipmentCount(e.target.value)} placeholder="Count" className="w-1/3 border border-gray-300 rounded-lg p-2" />
                        <button onClick={addEquipment} className="px-3 py-2 bg-blue-600 text-white rounded-lg">Add</button>
                    </div>
                    <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                        {equipment.map((eq, index) => (
                        <li key={index} className="bg-gray-100 p-2 rounded-md flex justify-between items-center">
                            {eq.name} - {eq.count}
                            <button onClick={() => removeEquipment(index)} className="text-red-600">Remove</button>
                        </li>
                        ))}
                    </ul>
                </div>

                {/* Workers */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Workers</label>
                        <div className="flex gap-2">
                            <input type="text" value={workerName} onChange={(e) => setWorkerName(e.target.value)} placeholder="Worker name" className="w-3/4 border border-gray-300 rounded-lg p-2" />
                            <button onClick={addWorker} className="px-3 py-2 bg-blue-600 text-white rounded-lg">Add</button>
                        </div>
                    <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                        {workers.map((worker, index) => (
                        <li key={index} className="bg-gray-100 p-2 rounded-md flex justify-between items-center">
                            {worker}
                            <button onClick={() => removeWorker(index)} className="text-red-600">Remove</button>
                        </li>
                        ))}
                    </ul>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button onClick={closeModal} className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</button>
                    <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddTask
