import { fetchSingleData } from '@/app/api/api';
import React, { useEffect, useState } from 'react'
import AddEquipment from './AddEquipment';

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

const Content: React.FC<PageProps> = ({ _id }) => {

    const [task, setTask] = useState<ITask>()
    const [equipment, setEquipment] = useState<IEquipment[]>()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const cancel = () => setIsModalOpen(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call api to get TASK
                const getTask = await fetchSingleData('get_single_task', _id);
                setTask(getTask)
                setEquipment(getTask.equipment)
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        
        // Call function
        fetchData();
    }, [])

    const equipmentAdditionSuccess = (newEquipment: IEquipment[]) => {
        console.log(newEquipment, 'newEquipment')
        setEquipment((prevEquipment) => [...newEquipment, ...prevEquipment as any])
    }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
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

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6 mb-8">
            <button
            //   onClick={() => navigate('/workers')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 transition-transform transform hover:scale-105">
            🏗️ View Workers
            </button>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition-transform transform hover:scale-105">
            🏢 add Equipment
            </button>
        </div>

        {/* Equipment Details Section */}
        <div className="w-full flex justify-center mt-10 px-4">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-300">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                    Equipment Details
                </h2>

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
    </div>

  )
}

export default Content