'use client'

import { useCallback, useEffect, useState } from "react"
import AddForm from "./AddForm"
import { fetchPaginationDetails } from "@/app/api/api"
import PaginationPage from "@/app/components/Pagination";

// For display equipment details
interface IEquipment {
  tool: string;
  available: number;
  onSite: number;
}

const Content = () => {

    // State to manage new equipment adding form (Show form while true)
    const [add, setAdd] = useState(false)

    // Save all equipments
    const [tools, setTools] = useState<IEquipment[]>([]);

    // Pagination stats
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalEquipmentCount, setTotalEquipmentCount] = useState<number>(0)
    const itemsPerPage = 6

    // Trigger while cancel form (Passing to child component(AddForm))
    const cancel = useCallback(() => {
      // Set false while cancel button click
      setAdd(false)
    }, [])

    // Fetch contractor tools to display
    useEffect(() => {
      const fetchData = async () => {
        try {

          // Call api to get equipment
          const fetchDetails = await fetchPaginationDetails('get_equipment', currentPage, itemsPerPage);

          // Store equipment details to state
          setTools(fetchDetails.equipment);
          setTotalEquipmentCount(fetchDetails.totalEquipmentCount)

        } catch (error) {
          console.error("Error fetching workers:", error);
        }
      };

      // Call function
      fetchData();

    }, [currentPage])

  // Add latest added equipment to state to display (Passing to child component(AddForm))
  const handleEquipmentAdded = (newTool: IEquipment) => {
    setTools((prevTools) => [...prevTools, newTool]);
  };

  return (
    <div className='p-7 text-2xl font-semibold flex-1 max-h-screen'>

        {/* Top Section - Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Equipment</h1>
          {add ? (
            <AddForm cancel={cancel} addEquipment={handleEquipmentAdded} /> 
            ) : (
              <button onClick={() => setAdd(true)} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-3 py-1.5 shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-1 rounded-xl">
                + Add New
              </button>
            ) 
          }
        </div>
          {tools && tools.length ? (

            <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl text-sm">
          <thead className="bg-blue-400 text-gray-700 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="text-left px-6 py-4">#</th>
              <th className="text-left px-6 py-4">Tool Name</th>
              <th className="text-left px-6 py-4">Available</th>
              <th className="text-left px-6 py-4">On-Site</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, index) => (
              <tr
              key={index}
              className="border-t border-gray-100 hover:bg-blue-50 transition"
              >
                <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{tool.tool}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      "bg-red-100 text-red-800"
                      }`}
                      >
                    {tool.available}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{tool.onSite}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              <h1 className="text-lg font-medium">No equipment found</h1>
            </div>
          )}
      <PaginationPage 
        count={Math.ceil(totalEquipmentCount / itemsPerPage)}
        onChange={(event, value) => setCurrentPage(value)}
      />

    </div>
  )
}

export default Content
