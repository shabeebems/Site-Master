import React, { useState } from 'react'
import { apiCheck } from '../../api/api';
import Loading from '../../components/Loading';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddFormProps = {
  cancel: Function;
  onWorkerAdded: (newWorker: { name: string; mobile: string; email: string; place: string }) => void;
};

type Worker = { name: string; mobile: string; email: string; place: string };

const AddForm: React.FC<AddFormProps> = ({cancel, onWorkerAdded}) => {
  

    const [newUser, setNewUser] = useState<Worker>({
      name: "",
      mobile: "",
      email: "",
      place: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setNewUser({ ...newUser, [name]: value })
    }

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true);

      try {
        const response = await apiCheck(newUser, 'contractor/newWorker')
        if(response.success) {
          toast.success(response.message, { 
            position: "top-right",
            style: { fontSize: "12px", padding: "8px", maxWidth: "250px" }
          });
          
          onWorkerAdded(newUser);
          setNewUser({ name: '', mobile: '', email: '', place: '' })
        } else {
          toast.error(response.message, { 
            position: "top-right",
            style: { fontSize: "12px", padding: "8px", maxWidth: "250px" } 
          });
        }
      } catch (error) {
        toast.error("Network error, please try again!", {
          position: "top-right",
          style: { fontSize: "12px", padding: "8px", maxWidth: "250px" } 
        });
        console.error("Worker adding failed:", error);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <>
      <ToastContainer />
        <form 
          className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto bg-white shadow-md px-4 py-2 rounded-xl border"
        >
          {["name", "mobile", "email", "place"].map((field, i) => (
            <input
              key={i}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              value={newUser[field as keyof Worker]}
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
            {isLoading ? (
                <Loading />
              ) : (
                <button
                  onClick={handleSubmit}
                  type="submit" 
                  className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-xs w-full md:w-auto hover:bg-blue-600 transition"
                >
                  Save
                </button>
              )}
            
          </div>
        </form>
    </>
  )
}

export default AddForm