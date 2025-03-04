'use client'

import React, { useCallback, useEffect, useState } from 'react'
import AddForm from './AddForm'
import { fetchDetails } from '@/app/api/api';

// For display workers details
interface Worker {
  name: string;
  email: string;
  mobile: string;
  place: string;
}

const Content = () => {

  // State to manage new worker adding form (Show form while true)
  const [add, setAdd] = useState(false)

  // Save all workers details
  const [workers, setWorkers] = useState<Worker[]>([]);

  // Fetch workers under contractor to display
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Call api to get workers
        const users = await fetchDetails('get_workers');

        // Store workers details to state
        setWorkers(users);

      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
  
    // Call function
    fetchData();

  }, [])

    // Trigger while cancel form (Passing to child component(AddForm))
    const cancel = useCallback(() => {
      // Set false while cancel button click
      setAdd(false)
    }, [])

  // Add latest added worker to state to display (Passing to child component(AddForm))
  const handleWorkerAdded = (newWorker: Worker) => {
    setWorkers((prevWorkers) => [...prevWorkers, newWorker]);
  };

  return (
    <div className='p-7 text-2xl font-semibold flex-1 max-h-screen'>

        {/* Top Section - Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Workers</h1>
          {add ? (
            <AddForm cancel={cancel} onWorkerAdded={handleWorkerAdded} /> 
            ) : (
              <button onClick={() => setAdd(true)} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-3 py-1.5 shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-1 rounded-xl">
                + Add New
              </button>
            ) 
          }
          
        </div>

        <ul className="pt-6 space-y-3">
          {workers&&workers.length ? workers.map((user, index) => (
            <li 
              key={index} 
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50 hover:scale-[1.01]"
            >
              {/* Left Section (User Info) */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 font-semibold rounded-full text-xs">
                  {user.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Right Section (Contact Info) */}
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700">{user.mobile}</p>
                <p className="text-xs text-gray-500">{user.place}</p>
              </div>
            </li>
          )) : <>
            <h1>No workers</h1>
          </>
          }
          
        </ul>

    </div>
  )
}

export default Content
