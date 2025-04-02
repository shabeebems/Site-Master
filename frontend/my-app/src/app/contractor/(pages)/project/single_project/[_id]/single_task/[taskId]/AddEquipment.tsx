import { fetchDetails } from '@/app/api/api';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PageProps = {
  cancel: Function;
};

interface IEquipment {
  tool: string;
  count: number;
  _id: string;
}

const AddEquipment: React.FC<PageProps> = ({ cancel }) => {
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [equipmentId, setEquipmentId] = useState<string>("");
  const [equipmentCount, setEquipmentCount] = useState<string>("");

  useEffect(() => {
      const fetchData = async () => {
        try {
          const getEquipment = await fetchDetails("get_equipment");
          setEquipment(getEquipment);
        } catch (error) {
          console.error("Error fetching equipment:", error);
          toast.error("Failed to fetch equipment.", { position: "top-right" });
        }
      };
      fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
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
              className="w-2/3 border border-gray-300 rounded-lg p-2"
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
              value={equipmentCount}
              onChange={(e) => setEquipmentCount(e.target.value)}
              placeholder="Count"
              min="1"
              className="w-1/3 border border-gray-300 rounded-lg p-2"
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
