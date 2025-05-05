'use client'
import React, { useEffect, useState } from 'react'
import AddTask from './AddTask';
import { useRouter } from "next/navigation";

import { fetchSingleData, statusEdits } from '@/app/api/api';

interface IProject {
    name: string;
    location: string;
    status: string;
    startingDate: Date;
    endingDate: Date;
    image: string;
}

interface ITask {
    name: string;
    startingDate: Date;
    endingDate: Date;
    status: string;
    _id: any;
}

type PageProps = {
    _id: any;
};


const Content: React.FC<PageProps> = ({ _id }) => {

    const router = useRouter()
    
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

    const taskAdditionSuccess = (newTask: ITask) => {
        setTasks((prevTasks) => [newTask, ...prevTasks])
    }

    const changeStatus = async(_id: string, status: string) => {
        await statusEdits('change_task_status', { _id, status });
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
                <span className={`px-4 py-1.5 rounded-full text-sm text-white ${
                    project?.status === 'Completed' ? 'bg-green-500' :
                    project?.status === 'In Progress' ? 'bg-blue-500' :
                    project?.status === 'On Hold' ? 'bg-yellow-500' :
                    project?.status === 'Pending' ? 'bg-orange-500' : // Purple for "Pending"
                    'bg-red-500'
                }`}>
                    {project?.status}
                </span>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-6 mb-8">
                {/* <button
                onClick={() => router.push(`/contractor/project/single_project/${_id}/workers`)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 transition-transform transform hover:scale-105">
                🏗️ View Workers
                </button> */}
                <button
                onClick={() => router.push(`/contractor/project/single_project/${_id}/equipment`)}
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
            <div className="w-full bg-gray-100 flex justify-center">
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
                    {tasks.length > 0 ? (
                    <div 
                    className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 mt-6"
                    
                    >
                        {tasks.map((task, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => router.push(`/contractor/project/single_project/${_id}/single_task/${task._id}`)}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-semibold text-gray-900">{task.name}</h3>
                                {(() => {
                                    const today = new Date();
                                    const startDate = new Date(task.startingDate);
                                    const endDate: any = new Date(task.endingDate);
                                    let taskStatus = task.status; // Default from DB
                                    if (today >= startDate && today <= endDate && taskStatus === "Pending") {
                                        taskStatus = "In Progress"
                                        changeStatus(task._id, taskStatus)
                                    } else if (today > endDate && taskStatus !== "Completed" && taskStatus !== "On Hold") {
                                        taskStatus = "Completed"
                                        changeStatus(task._id, taskStatus)
                                    }

                                    return (
                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-medium ${
                                            taskStatus === 'Pending'
                                                ? 'bg-red-100 text-red-800'
                                                :  taskStatus === 'In Progress'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}>
                                            {taskStatus}
                                        </span>
                                    )
                                }) ()}
                                {/* <span
                                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                                    task.status === 'Pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                    {task.status}
                                </span> */}
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>📅 Start: <strong>{formatDate(task.startingDate)}</strong></span>
                                <span>📅 End: <strong>{formatDate(task.endingDate)}</strong></span>
                            </div>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <div className="text-center text-gray-500 mt-6">
                        <p>No tasks available. Add a new task to get started.</p>
                    </div>
                    )}
                </div>
            </div>



            {/* Modal */}
            {isModalOpen && (
                <AddTask taskAdditionSuccess={taskAdditionSuccess} closeModal={closeModal} projectId={_id} projectName={project?.name} dates={{start: project?.startingDate, end: project?.endingDate}}/>
            )}
        </div>
    )
}

export default Content
