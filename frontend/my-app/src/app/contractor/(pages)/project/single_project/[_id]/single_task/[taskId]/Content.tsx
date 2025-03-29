'use client'
import { dataValidation, fetchSingleData } from '@/app/api/api';
import React, { useEffect, useState } from 'react'
import AddEquipment from './AddEquipment';
import AddWorker from './AddWorker';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PageProps = {
    _id: any;
};

type ITask = {
    name: string;
    startingDate: Date;
    endingDate: Date;
    status: string;
    _id: string;
}

type IEquipment = {
    name: string;
    status: string;
    count: number;
}

type IWorker = {
    name: string;
    role: string;
    _id: string;
}

const Content: React.FC<PageProps> = ({ _id }) => {

    const [task, setTask] = useState<ITask>()
    const [equipment, setEquipment] = useState<IEquipment[]>()
    const [workers, setWorkers] = useState<IWorker[]>([])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const cancel = () => setIsModalOpen(false)

    const [workerAddForm, setWorkerAddForm] = useState(false)
    const cancelWorkerForm = () => setWorkerAddForm(false)

    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call api to get TASK
                const getTask = await fetchSingleData('get_single_task', _id);
                setTask(getTask[0])
                setEquipment(getTask[0].equipment)
                setWorkers(getTask[1])
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        
        // Call function
        fetchData();
    }, [])

    const equipmentAdditionSuccess = (newEquipment: IEquipment[]) => {
        setEquipment((prevEquipment) => [...newEquipment, ...prevEquipment as any])
    }

    const workerAddition = async(workerId: string) => {
        const existWorker = workers.some(worker => worker._id == workerId);
        if(existWorker) {
            toast.error('Already added this worker', { position: "top-right", });
        } else {
            const response = await dataValidation({ workerId, _id }, `task/add_worker`);
            toast.success(response.message, { position: "top-right", });
            setWorkers(prev => [...prev, response.data])
        }
    }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <ToastContainer />
        {/* Task Details Section */}
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {task?.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(task?.startingDate)} - {formatDate(task?.endingDate)}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-sm text-white ${
                    task?.status === 'Completed' ? 'bg-green-500' :
                    task?.status === 'In Progress' ? 'bg-blue-500' :
                    task?.status === 'On Hold' ? 'bg-yellow-500' :
                    task?.status === 'Pending' ? 'bg-orange-500' :
                    'bg-red-500'
                }`}>
                    {task?.status}
                </span>
            </div>
        </div>

        {/* Equipment Details Section */}
        <div className="w-full flex justify-center mt-10 px-4 relative">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-300">
                {/* Header Section with Add Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Equipment Details
                    </h2>
                    <button 
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
                        onClick={() => setIsModalOpen(true)} // Replace with your function
                    >
                        + Add Equipment
                    </button>
                </div>

                {equipment?.length || 0 > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {equipment?.map((item, index) => (
                            <div 
                                key={index} 
                                className="relative bg-white p-6 rounded-xl shadow-md border border-gray-300 hover:shadow-lg transition-all transform hover:scale-105"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-gray-600">
                                    <span className="font-medium text-gray-700">Quantity:</span> {item.count}
                                </p>
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                        item.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-8">
                        <p className="text-lg font-medium">No equipment assigned to this task.</p>
                    </div>
                )}
            </div>
        </div>

        {/* Workers Section */}
        <div className="w-full flex justify-center mt-10 px-4">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-300">
                
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Workers List</h2>
                    {workerAddForm ? (
                        <AddWorker cancel={cancelWorkerForm} workerAddition={workerAddition} />
                    ) : (
                        <button 
                            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-all"
                            onClick={() => setWorkerAddForm(true)}
                        >
                            + Add Worker
                        </button>
                    )}
                </div>

                {workers?.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {workers?.map((worker, index) => (
                            <div 
                                key={index} 
                                className="bg-white p-6 rounded-xl shadow-md border border-gray-300 hover:shadow-lg transition-all transform hover:scale-105"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
                                <p className="text-gray-600"><span className="font-medium text-gray-700">Role:</span> {worker.role}</p>
                                
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-8">
                        <p className="text-lg font-medium">No workers assigned to this task.</p>
                    </div>
                )}
            </div>
        </div>


        {/* Modal */}
        {isModalOpen && (
            <AddEquipment equipmentAdditionSuccess={equipmentAdditionSuccess} cancel={cancel} dates={{ start: task?.startingDate, end: task?.endingDate } } taskId={ task?._id } />
        )}
    </div>
  )
}

export default Content