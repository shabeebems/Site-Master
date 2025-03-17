'use client'

import { fetchSingleData } from '@/app/api/api';
import React, { useEffect, useState } from 'react'

interface PageProps {
    params: { [key: string]: string };
}

interface Project {
  name: string;
  location: string;
  status: string;
  startingDate: Date;
  endingDate: Date;
  _id: any;
  image: string;
}

const formatDate = (dateString: any) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString();
};

const tasks = [
  { 
    name: "Foundation Work", 
    startDate: "2024-03-01", 
    endDate: "2024-05-15", 
    status: "in-progress" 
  },
  { 
    name: "Steel Framework Installation", 
    startDate: "2024-05-20", 
    endDate: "2024-08-30", 
    status: "planned" 
  }
];

const equipment = [
  { 
    name: "Tower Crane", 
    count: 2, 
    startDate: "2024-03-01", 
    expireDate: "2025-12-31" 
  },
  { 
    name: "Concrete Mixer", 
    count: 4, 
    startDate: "2024-02-15", 
    expireDate: "2024-12-31" 
  }
];


const Page: React.FC<PageProps>  = ({params}) => {

  const [project, setProject] = useState<Project>()

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Call api to get projects
        const getProject = await fetchSingleData('get_single_project', params?._id);
        // Store projects details to state
        setProject(getProject);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    // Call function
    fetchData();
  }, [])

  
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

      {/* Photo Section */}
      <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-8">
        <span className="text-gray-400">Construction Site Photo</span>
      </div>

      {/* Tasks and Equipment Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Tasks Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Project Tasks</h2>
          <div className="grid gap-4">
            {tasks.map((task, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{task.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Start: {formatDate(task.startDate)}</span>
                  <span>End: {formatDate(task.endDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Column */}
        <div>
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
                    <span>{formatDate(item.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiry:</span>
                    <span>{formatDate(item.expireDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page
