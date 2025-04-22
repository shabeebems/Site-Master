import { apiCheck, checkEquipmentCount, dataValidation, fetchDetails } from '@/app/api/api';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PageProps = {
  cancel: Function;
  dates: any;
  taskId: any;
  usedEquipment: any;
  success: Function;
};

interface IEquipment {
  tool: string;
  count: number;
  _id: string;
}

const AddEquipment: React.FC<PageProps> = ({ success, usedEquipment, taskId, cancel, dates }) => {
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [equipmentId, setEquipmentId] = useState<string>("");
  const [inputCount, setInputCount] = useState<string>("");

  useEffect(() => {
      const fetchData = async () => {
        try {
          const getEquipment = await fetchDetails("get_allEquipment");
          const getNonUsing = getEquipment.filter((eqGet: any) =>
            !usedEquipment.some((eqUsed: any) => eqGet._id === eqUsed.equipmentId)
          );
          setEquipment(getNonUsing);
        } catch (error) {
          console.error("Error fetching equipment:", error);
          toast.error("Failed to fetch equipment.", { position: "top-right" });
        }
      };
      fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if(!equipmentId || !inputCount || Number(inputCount) < 1) {
        toast.error("Fill the blanks.", { position: "top-right" });
        return;
      }
      const checkCount = await checkEquipmentCount({ equipmentId, inputCount, ...dates }, "check_equipment_count")
      if(!checkCount.success) {
        toast.error(checkCount.message, { position: "top-right" });
        return;
      }
      const data = {
        equipmentId,
        count: inputCount,
        status: "Pending",
      }
      const response = await dataValidation(data, `task/add_equipment/${taskId}`)
      if(!response.success) {
        toast.error(response.message, { position: "top-right" });
        return
      }
      toast.success(response.message, { position: "top-right" });
      success({ ...data, name: response.data.name })
      setEquipmentId('')
      // Removing from selector show
      setEquipment(prev => prev.filter(item => item._id !== data.equipmentId));
    }

  return (
    <>
      <ToastContainer />
        <form 
          className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto bg-white shadow-md px-4 py-2 rounded-xl border"
        >
            <select
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Select Equipment</option>
              {equipment.map((tool) => (
                <option key={tool._id} value={tool._id}>
                  {tool.tool}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={inputCount}
              onChange={(e) => setInputCount(e.target.value)}
              placeholder="Count"
              min="1"
              className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
            />


          {/* Buttons */}
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <button 
                    onClick={() => cancel()}
                    type="button" 
                    className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md text-xs w-full md:w-auto"
                    >
                    Cancel
                  </button>
                
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-xs w-full md:w-auto hover:bg-blue-600 transition"
                    >
                      Save
                  </button>
              </div>

        </form>
    </>
  )
}

export default AddEquipment
