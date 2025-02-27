import React from 'react'
import { FaTasks } from "react-icons/fa";


const Content = () => {

  const projects = [
    { title: "Project A", status: "In Progress", date: "Feb 19, 2025" },
    { title: "Project E", status: "On Hold", date: "Feb 05, 2025" },
    { title: "Project F", status: "Completed", date: "Feb 02, 2025" },
  ];

  const statusColors = {
    "In Progress": "bg-blue-500",
    "Completed": "bg-green-500",
    "On Hold": "bg-red-500"
  };

  return (
    <>
        <div className="p-7 text-2xl font-medium flex-1 max-h-screen">

          {/* Top Section - Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Projects</h1>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-3 py-1.5 shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-1 rounded-xl">
              + Add New
            </button>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white shadow-xl rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img src='/project.jpg' alt={project.title} className="w-full h-44 " />
                  
                  {/* Status Badge (Top Right) */}
                  <span
                    className={`absolute top-3 right-3 text-xs text-white px-3 py-1 rounded-full bg-red-500`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col justify-between h-32">
                  {/* Project Title */}
                  <h2 className="text-lg font-semibold text-gray-800">{project.title}</h2>

                  {/* Bottom Section: Date + Icon */}
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm text-gray-500">{project.date}</p>

                    {/* Notification Icon */}
                    <div className="p-2 bg-gray-200 rounded-full">
                      <FaTasks size={16} className="text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



    </>
  )
}

export default Content
