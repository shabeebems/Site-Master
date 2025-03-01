'use client'

import { useCallback, useEffect, useState } from "react"
import AddForm from "./AddForm"
import { fetchDetails } from "@/app/api/api"

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
          const getTools = await fetchDetails('get_equipment');

          // Store equipment details to state
          setTools(getTools);

        } catch (error) {
          console.error("Error fetching workers:", error);
        }
      };

      // Call function
      fetchData();

    }, [])

  // Add latest added equipment to state to display (Passing to child component(AddForm))
  const handleEquipmentAdded = (newTool: IEquipment) => {
    setTools((prevTools) => [...prevTools, newTool]);
  };

  return (
    <div className='p-7 text-2xl font-semibold flex-1 max-h-screen'>

        {/* Top Section - Button */}
        <div className="flex justify-between items-center">
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

        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="p-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 relative overflow-hidden"
            >
              {/* Floating Blur Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl pointer-events-none"></div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
                {tool.tool}
              </h2>

              {/* Tool Information */}
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-green-600">Available:</span> {tool.available}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-blue-600">On-Site:</span> {tool.onSite}
                </p>
              </div>

              {/* Button */}
              <div className="mt-4">
                <button
                  className="w-full py-2 rounded-lg bg-blue-500 text-white text-sm font-medium shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
                  role="button"
                >
                  View Details
                </button>
              </div>
            </div>


          ))}
        </div>
      </div>
  )
}

export default Content
