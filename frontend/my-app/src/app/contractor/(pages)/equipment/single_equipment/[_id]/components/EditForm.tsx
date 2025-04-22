import React, { useState } from 'react'

type PageProps = {
    exit: Function;
    equipment: any;
};

const EditForm: React.FC<PageProps> = ({ exit, equipment }) => {

    const [editEquipment, setEditEquipment] = useState<any>({
        _id: equipment._id,
        tool: equipment.tool,
        count: equipment.count
    })

  return (
    <form 
          className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto bg-white shadow-md px-4 py-2 rounded-xl border"
    >
        {["tool", "count"].map((field, i) => (
            <input
            key={i}
            type={field == 'count' ? 'number' : 'text'}
            value={editEquipment[field]}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
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
