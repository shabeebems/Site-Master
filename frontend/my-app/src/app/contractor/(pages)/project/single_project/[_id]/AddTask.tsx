import { apiCheck } from '@/app/api/api';
import Loading from '@/app/components/Loading';
import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskData {
    name: string;
    startingDate: string;
    endingDate: string;
}

interface ProjectModalProps {
    closeModal: () => void;
    projectId: any;
    dates: any;
    taskAdditionSuccess: Function;
}

const AddTask = ({closeModal, projectId, dates, taskAdditionSuccess}: ProjectModalProps) => {

    const [taskData, setTaskData] = useState<TaskData>({
        name: '',
        startingDate: "",
        endingDate: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if((name === 'startingDate' || name === 'endingDate') && value != new Date(dates.start).toLocaleDateString('en-GB').split('/').reverse().join('-')) {
            if(value < dates.start || value > dates.end) {
                toast.error("Please enter a date within the project dates", { position: "top-right", });
                return
            }
        }
        setTaskData({ ...taskData, [name]: value })
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await apiCheck({ ...taskData }, `contractor/add_task/${projectId}`)
            if(response.success) {
                toast.success(response.message, { position: "top-right", });
                setTaskData({
                    name: '',
                    startingDate: "",
                    endingDate: ""
                })
                taskAdditionSuccess(response.data)
            } else {
                toast.error(response.message, { position: "top-right", });
            }
        } catch (error) {
            console.log('Task adding error', error)
            toast.error('Error from server side while task adding', { position: "top-right", });
        } finally {
            setIsLoading(false)
        }
    }
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <ToastContainer />
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl space-y-5 max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
                
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Task Name</label>
                    <input onChange={handleChange} type="text" name='name' placeholder="Enter task name" value={taskData.name} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Starting Date</label>
                    <input onChange={handleChange} type="date" name='startingDate' min={new Date().toISOString().split("T")[0]} value={taskData.startingDate} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Ending Date</label>
                    <input onChange={handleChange} type="date" name='endingDate' min={new Date().toISOString().split("T")[0]} value={taskData.endingDate} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                {isLoading ? 
                    <Loading />
                : (
                    <div>
                        <button onClick={closeModal} className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</button>
                        <button onClick={handleSubmit} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Save</button>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default AddTask
