import { apiCheck, checkEquipmentCount, fetchDetails } from "@/app/api/api";
import Loading from "@/app/components/Loading";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Equipment {
  tool: string;
  count: number;
  _id: string;
}

interface SelectedEquipment {
  _id?: string;
  equipmentId: string;
  name: string;
  count: number;
  status: string;
}

interface ProjectModalProps {
  cancel: () => void;
  dates: { start: any; end: any };
  taskId: any
  equipmentAdditionSuccess: Function
}

const AddEquipment: React.FC<ProjectModalProps> = ({ equipmentAdditionSuccess, cancel, dates, taskId }) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [equipmentName, setEquipmentName] = useState<string>("");
  const [equipmentCount, setEquipmentCount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<SelectedEquipment[]>([]);

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

  const addEquipment = async () => {
    setIsLoading(true);

    if (!equipmentName || !equipmentCount || Number(equipmentCount) <= 0) {
      toast.error("Please select valid equipment and enter a positive count.", {
        position: "top-right",
      });
      return;
    }

    const selected = equipment.find((item) => item.tool === equipmentName);
    if (!selected) {
      toast.error("Invalid equipment selected.", { position: "top-right" });
      return;
    }

    // Prevent duplicate equipment selection
    if (inputs.some((item) => item.equipmentId === selected._id)) {
      toast.error("Equipment already added.", { position: "top-right" });
      return;
    }

    try {
      const data = {
        equipmentId: selected._id,
        totalCount: selected.count,
        start: dates.start,
        end: dates.end,
        inputCount: Number(equipmentCount),
      };

      const response = await checkEquipmentCount({ data }, "check_equipment_count");

      if (!response.success) {
        toast.error(response.message, { position: "top-right" });
      } else {
        setInputs([...inputs, { equipmentId: selected._id, name: selected.tool, count: Number(equipmentCount), status: 'Pending' }]);
        setEquipmentName("");
        setEquipmentCount("");
      }
    } catch (error) {
      console.error("Error checking equipment:", error);
      toast.error("Something went wrong. Please try again.", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  const removeEquipment = (index: number) => {
    setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
  };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if(inputs.length == 0) {
                toast.error("Add some equipment", { position: "top-right", });
                return
            }

            const response = await apiCheck({ inputs }, `contractor/task/add_equipment/${taskId}`)
            if(response.success) {
                toast.success(response.message, { position: "top-right", });
                setInputs([])
                console.log('ewrrt')
                equipmentAdditionSuccess(inputs)
            } else {
                toast.error(response.message, { position: "top-right", });
            }
        } catch (error) {
            toast.error("Problem while adding equipment", { position: "top-right", });
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl space-y-5 max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800">Add New Equipment</h2>

        {/* Equipment Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Equipment</label>
          <div className="flex gap-2">
            <select
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              className="w-2/3 border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Equipment</option>
              {equipment.map((tool) => (
                <option key={tool._id} value={tool.tool}>
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
            <button
              onClick={addEquipment}
              disabled={isLoading}
              className={`px-3 py-2 rounded-lg ${
                isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Selected Equipment List */}
        <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto">
          {inputs.map((eq, index) => (
            <li key={eq._id} className="bg-gray-100 p-2 rounded-md flex justify-between items-center">
              {eq.name} - {eq.count}
              <button onClick={() => removeEquipment(index)} className="text-red-600">
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <button
                onClick={cancel}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEquipment;
