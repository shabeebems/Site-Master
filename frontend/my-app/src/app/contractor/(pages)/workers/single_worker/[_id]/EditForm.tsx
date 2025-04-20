import { dataValidation } from '@/app/api/api';
import React, { useState } from 'react'

type PageProps = {
    exit: Function;
    edit: Function;
    worker: any;
};

const EditForm: React.FC<PageProps> = ({ exit, edit, worker }) => {

    const [editWorker, setEditWorker] = useState<any>({
        _id: worker._id,
        name: worker.name,
        place: worker.place,
        profession: worker.profession
    })
  
    // Trigger while input changing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditWorker({ ...editWorker, [name]: value })
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        const response = await dataValidation(editWorker, 'edit_worker')
        edit(editWorker, response.success)
    }

    return (
    <form 
          className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto bg-white shadow-md px-4 py-2 rounded-xl border"
        >
          {["name", "place", "profession"].map((field, i) => (
            <input
              key={i}
              type="text"
              name={field}
              value={editWorker[field]}
              onChange={handleChange}
              placeholder={field === "profession" ? "Role" : field.charAt(0).toUpperCase() + field.slice(1)}
              className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
              required
            />
          ))}
          {/* Buttons */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <button 
              onClick={() => exit()}
              type="button" 
              className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md text-xs w-full md:w-auto"
            >
              Cancel
            </button>
            <button
                onClick={handleSubmit}
                type="submit" 
                className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-xs w-full md:w-auto hover:bg-blue-600 transition"
            >
                Save
            </button>
          </div>
        </form>
  )
}

export default EditForm
