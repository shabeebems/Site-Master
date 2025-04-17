import React, { useEffect, useState } from 'react'

type EditFormProps = {
    worker: any;
    cancelEdit: Function;
}

const EditForm: React.FC<EditFormProps> = ({ worker, cancelEdit }) => {

    const [editWorker, setEditWorker] = useState<any>({
        name: '',
        place: '',
        role: ''
    });
      
    useEffect(() => {
        if (worker) {
            setEditWorker({
            name: worker.name || '',
            place: worker.place || '',
            role: worker.role || ''
            });
        }
    }, [worker]);
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditWorker((prev: any) => ({
          ...prev,
          [name]: value
        }));
    };

    return (
        <>
            <form 
            className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto bg-white shadow-md px-4 py-2 rounded-xl border"
            >
            {["name", "place", "role"].map((field, i) => (
                <input
                    key={i}
                    type="text"
                    name={field}
                    value={editWorker[field] || ""}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
                    required
                />
            ))}

            {/* Buttons */}
            <div className="flex items-center gap-2 mt-2 md:mt-0">
                <button 
                    type="button" 
                    onClick={cancelEdit()}
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
        </>
    )
}

export default EditForm
