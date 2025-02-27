import { apiCheck } from '@/app/api/api';
import React, { useState } from 'react'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddFormProps = {
  cancel: Function;
  addEquipment: Function;
};

type tools = { tool: string; count: string }

const AddForm: React.FC<AddFormProps> = ({ cancel, addEquipment }) => {

  const [formData, setFormData] = useState<tools>({
    tool: '',
    count: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const submit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {

      const response = await apiCheck(formData, 'contractor/add_equipment')
      if(response.success) {
        toast.success(response.message, { 
          position: "top-right",
          style: { fontSize: "12px", padding: "8px", maxWidth: "250px" }
        });
        addEquipment({...formData, available: formData.count, onSite: 0 })
        setFormData({ tool: '', count: '' })
      } else {

        toast.error(response.message, { 
          position: "top-right",
          style: { fontSize: "12px", padding: "8px", maxWidth: "250px" } 
        });

      }
    } catch (error) {
      
    }
  }

  return (
      <>
        <ToastContainer />

        <form 
        className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto bg-white shadow-md px-4 py-2 rounded-xl border"
        >
        {["tool", "count"].map((field, i) => (
          <input
          key={i}
          type={field == 'count' ? 'number' : 'text'}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          onChange={handleChange}
            value={formData[field as keyof tools]}
            className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
            required
          />
        ))}
        
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
                onClick={submit}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-xs w-full md:w-auto hover:bg-blue-600 transition"
                >
                Save
            </button>
          
          </div>
        </form>
      </>
  )
}

export default AddForm