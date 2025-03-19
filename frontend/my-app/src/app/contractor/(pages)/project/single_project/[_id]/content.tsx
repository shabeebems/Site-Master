'use client'
import React, { useEffect, useState } from 'react'
import AddTask from './AddTask';

import { fetchSingleData } from '@/app/api/api';

interface IProject {
    name: string;
    location: string;
    status: string;
    startingDate: Date;
    endingDate: Date;
    // _id: any;
    image: string;
}

interface ITask {
    name: string;
    startingDate: Date;
    endingDate: Date;
    status: string;
}

type PageProps = {
    _id: any;
};


const Content: React.FC<PageProps> = ({ _id }) => {

    const [tasks, setTasks] = useState<ITask[]>([])

    // const [equipment, setEquipment] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [project, setProject] = useState<IProject>()

    useEffect(() => {
      const fetchData = async () => {
        try {
  
          // Call api to get project
          const getProject = await fetchSingleData('get_single_project', _id);
          // Store project details to state
          setProject(getProject[0]);
          setTasks(getProject[1])
        //   setEquipment(getProject[2])
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
    
      // Call function
      fetchData();
    }, [])

    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {project?.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project?.location}
                </span>
                <span className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(project?.startingDate)} - {formatDate(project?.endingDate)}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-sm bg-yellow-100 text-yellow-800`}>
                    {project?.status}
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
                //   onClick={() => navigate('/equipment')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition-transform transform hover:scale-105">
                🏢 View Equipment
                </button>
            </div>

            {/* Photo Section */}
            <div className="overflow-auto bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-8">
                <span className="text-gray-400 max-h-full w-full flex items-center justify-center">
                <img src={project?.image} alt="" className="max-w-full max-h-full object-contain" />
                </span>
            </div>


            {/* Tasks and Equipment Grid */}
            {/* <div className="grid  gap-8"> */}
            {/* Tasks Column */}
            <div className="w-full min-h-screen bg-gray-100 flex justify-center">
                <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-8 border border-gray-300">
                    {/* Header Section */}
                    <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-800">Project Tasks</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
                        + New Task
                    </button>
                    </div>

                    {/* Task List Section */}
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 mt-6">
                    {tasks.map((task, index) => (
                        <div 
                        key={index} 
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{task.name}</h3>
                            <span 
                            className={`px-4 py-1 rounded-full text-sm font-medium ${
                                task.status === 'Pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                            {task.status}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>📅 Start: <strong>{formatDate(task.startingDate)}</strong></span>
                            <span>📅 End: <strong>{formatDate(task.endingDate)}</strong></span>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>


                {/* Equipment Column */}
                {/* <div>
                <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Equipment Inventory</h2>
                <div className="grid gap-4">
                    {equipment.map((item, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-sm">
                            {item.count} units
                        </span>
                        </div>
                        <div className="space-y-1.5 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Issued:</span>
                            <span>{formatDate(item.startingDate)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Expiry:</span>
                            <span>{formatDate(item.endingDate)}</span>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div> */}
            {/* </div> */}
            {/* Modal */}
            {isModalOpen && (
                <AddTask closeModal={closeModal} projectId={_id}/>
            )}
        </div>
    )
}

export default Content
