import { checkEquipmentCount, fetchDetails } from '@/app/api/api';
import Loading from '@/app/components/Loading';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Equipment {
    tool: string;
    count: number;
    _id: string;
}

interface ProjectModalProps {
    cancel: () => void;
    dates: any
}

const AddEquipment = ({ cancel, dates }: ProjectModalProps) => {

    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [equipmentName, setEquipmentName] = useState<string>("");
    const [equipmentCount, setEquipmentCount] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call api to get equipment
                const getEquipment = await fetchDetails('get_equipment');
                // Store equipment details to state
                setEquipment(getEquipment);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchData();
    }, [])

    const addEquipment = async() => {
        if (!equipmentName || !equipmentCount) {
            toast.error("Please select equipment and enter a valid count.", { position: "top-right" });
            return;
        }

        // Find the equipment to get available count
        const clickedItem = equipment.find(t => t.tool === equipmentName)

        const data = {
            equipmentId: clickedItem?._id,
            count: clickedItem?.count,
            start: dates.start,
            end: dates.end
        }
        await checkEquipmentCount({ data }, `check_equipment_count`)

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
            <ToastContainer />
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl space-y-5 max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
                
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
                            {equipment.map((tool, index) => (
                                <option key={index} value={tool.tool}>{tool.tool}</option>
                            ))}
                        </select>
                        <input 
                            type="number" value={equipmentCount}
                            onChange={(e) => setEquipmentCount(e.target.value)} 
                            placeholder="Count"
                            className="w-1/3 border border-gray-300 rounded-lg p-2" 
                        />
                        <button 
                        onClick={addEquipment}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg">Add</button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                {isLoading ? 
                    <Loading />
                : (
                    <div>
                        <button onClick={cancel} className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</button>
                        <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Save</button>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default AddEquipment
