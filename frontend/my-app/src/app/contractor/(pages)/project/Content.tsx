'use client'
import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import AddModal from "./AddModal";
import { fetchDetails } from "@/app/api/api";
import { useRouter } from "next/navigation";

interface Project {
  name: string;
  location: string;
  status: string;
  startingDate: Date;
  endingDate: Date;
  _id: any;
}

const Content = () => {

  const router = useRouter()

    const [projects, setProjects] = useState<Project[]>([])

    // Fetch projects under contractor to display
    useEffect(() => {
      const fetchData = async () => {
        try {
  
          // Call api to get projects
          const getProjects = await fetchDetails('get_projects');

          // Store projects details to state
          setProjects(getProjects);
  
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
    
      // Call function
      fetchData();
  
    }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const cancelModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
        <div className="p-7 text-2xl font-medium flex-1 max-h-screen">

          {/* Top Section - Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Projects</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-3 py-1.5 shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-1 rounded-xl"
            >
              + Add New
            </button>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                onClick={() => router.push(`/contractor/project/single_project/${project._id}`)}
                className="bg-white shadow-xl rounded-xl overflow-hidden transition-transform transform cursor-pointer hover:scale-105 duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img src='/project.jpg' alt={project.name} className="w-full h-44 " />
                  
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
                  <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>
                  <p className="text-sm text-gray-500">{project.location}</p>
                  {/* Bottom Section: Date + Icon */}
                  <div className="flex justify-between items-center mt-3">
                    {/* <p className="text-sm text-gray-500">{project.startingDate}</p> */}
                    <p className="text-sm text-gray-500"><strong>Start:</strong> {new Date(project.startingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    <p className="text-sm text-gray-500"><strong>End:</strong> {new Date(project.endingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
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

        {/* Modal */}
        {isModalOpen && (
          <AddModal cancel={cancelModal} />
        )}


    </>
  )
}

export default Content
