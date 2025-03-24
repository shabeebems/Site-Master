import { apiCheck, fetchDetails } from '@/app/api/api';
import Loading from '@/app/components/Loading';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Equipment {
    name: string;
    count: number;
    equipmentId: any;
    status: string;
}

interface TaskData {
    name: string;
    startingDate: string;
    endingDate: string;
}

interface ProjectModalProps {
    closeModal: () => void;
    projectId: any;
    dates: any;
    taskAdditionSuccess: Function;
}

const AddTask = ({closeModal, projectId, dates, taskAdditionSuccess}: ProjectModalProps) => {

    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [workers, setWorkers] = useState<string[]>([]);
    const [equipmentName, setEquipmentName] = useState<string>("");
    const [equipmentCount, setEquipmentCount] = useState<string>("");
    const [workerName, setWorkerName] = useState<string>("");
    const [taskData, setTaskData] = useState<TaskData>({
        name: '',
        startingDate: "",
        endingDate: ""
    })

    // To store available equipment from db
    const [availableEquipment, setAvailableEquipment] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call api to get available equipment
                const getAvailableEquipment = await fetchDetails('get_available_equipment');
                // Store equipment details to state
                setAvailableEquipment(getAvailableEquipment);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchData();
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const addEquipment = () => {
        if (!equipmentName || !equipmentCount) {
            toast.error("Please select equipment and enter a valid count.", { position: "top-right" });
            return;
        }

        // Find the equipment to get available count
        const availableItem = availableEquipment.find(t => t.tool === equipmentName)
        
        // Check if the equipment is already added
        if (equipment.some((item) => item.name === equipmentName)) {
            toast.error(`${equipmentName} is already added`, { position: "top-right", });
            return
        }
        
        if(availableItem.available < equipmentCount) {
            // While input number is gt available number
            toast.error(`Only ${availableItem.available} ${equipmentName} are available`, { position: "top-right", });
            return
        }
        
        // Add equipment to the list
        setEquipment([...equipment, { equipmentId: availableItem._id, name: equipmentName, count: Number(equipmentCount), status: 'Pending' }]);

        setEquipmentName("");
        setEquipmentCount("");
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if((name === 'startingDate' || name === 'endingDate') && value != new Date(dates.start).toLocaleDateString('en-GB').split('/').reverse().join('-')) {
            if(value < dates.start || value > dates.end) {
                toast.error("Please enter a date within the project dates", { position: "top-right", });
                return
            }
        }
        setTaskData({ ...taskData, [name]: value })
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await apiCheck({ ...taskData, workers, equipment }, `contractor/add_task/${projectId}`)
            if(response.success) {
                toast.success(response.message, { position: "top-right", });
                setEquipment([])
                setWorkers([])
                setTaskData({
                    name: '',
                    startingDate: "",
                    endingDate: ""
                })
                taskAdditionSuccess({ ...taskData, status: "Pending" })
            } else {
                toast.error(response.message, { position: "top-right", });
            }
        } catch (error) {
            console.log('Task adding error', error)
            toast.error('Error from server side while task adding', { position: "top-right", });
        } finally {
            setIsLoading(false)
        }
    }
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <ToastContainer />
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl space-y-5 max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
                
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Task Name</label>
                    <input onChange={handleChange} type="text" name='name' placeholder="Enter task name" value={taskData.name} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Starting Date</label>
                    <input onChange={handleChange} type="date" name='startingDate' min={new Date().toISOString().split("T")[0]} value={taskData.startingDate} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Ending Date</label>
                    <input onChange={handleChange} type="date" name='endingDate' min={new Date().toISOString().split("T")[0]} value={taskData.endingDate} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Equipment */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Equipment</label>
                    <div className="flex gap-2">
                        <select
                            value={equipmentName}
                            onChange={(e) => setEquipmentName(e.target.value)}
                            className="w-2/3 border border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Equipment</option>
                            {availableEquipment.map((tool, index) => (
                                <option key={index} value={tool.tool}>{tool.tool}</option>
                            ))}
                        </select>
                        <input 
                            type="number" value={equipmentCount} onChange={(e) => setEquipmentCount(e.target.value)} placeholder="Count" className="w-1/3 border border-gray-300 rounded-lg p-2" 
                        />
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
                {isLoading ? 
                    <Loading />
                : (
                    <div>
                        <button onClick={closeModal} className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</button>
                        <button onClick={handleSubmit} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Save</button>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default AddTask
