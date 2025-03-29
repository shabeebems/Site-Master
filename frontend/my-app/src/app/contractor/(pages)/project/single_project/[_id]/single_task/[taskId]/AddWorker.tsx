import { dataValidation, fetchDetails } from '@/app/api/api';
import React, { useEffect, useState } from 'react'

type PageProps = {
    cancel: Function;
    workerAddition: Function;
};

type IWorker = {
    name: string
    _id: string
}

const AddWorker: React.FC<PageProps> = ({ cancel, workerAddition }) => {

    const [roles, setRoles] = useState([])
    const [workers, setWorkers] = useState<IWorker[]>([])
    const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getRoles = await fetchDetails("get_workerRoles");
                setRoles(getRoles)
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };
        fetchData();
    }, [])

    const roleChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        const getWorkers = await fetchDetails(`get_workers_to_add_task/${e.target.value}`);
        setWorkers(getWorkers)
    }

    const handleWorkerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWorkerId(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedWorkerId) {
            alert("Please select a worker.");
            return;
        }

        try {
            workerAddition(selectedWorkerId)
            // await dataValidation({ workerId: selectedWorkerId, taskId }, `task/add_worker`);

        } catch (error) {
            console.error("Error assigning worker:", error);
        }
    };

  return (
    <>
        <form 
          className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto bg-white shadow-md px-4 py-2 rounded-xl border"
        >
            <select
              name="role"
              className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
              onChange={roleChange}
              required
            >
              <option value="">Select role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
            <select
              name="name"
              value={selectedWorkerId}  // Ensures controlled component
              onChange={handleWorkerChange}
              className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
              required
            >
              <option value="">Select worker</option>
              {workers.map((user) => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>


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

export default AddWorker
