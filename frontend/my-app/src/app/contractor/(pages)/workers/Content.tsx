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
  profession: string;
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

        <ul className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {workers && workers.length ? (
    workers.map((user, index) => (
      <li
        key={index}
        className="flex flex-col justify-between p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50"
      >
        {/* Top: Avatar and Basic Info */}
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 font-bold rounded-full text-sm">
            {user.name[0]}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">{user.name}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-2 border-gray-200" />

        {/* Bottom: Profession and Place */}
        <div className="flex justify-between items-center text-xs text-gray-700">
          <div className="flex flex-col">
            <span className="font-medium">Profession</span>
            <span className="text-gray-600">{user.profession}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-medium">Place</span>
            <span className="text-gray-600">{user.place}</span>
          </div>
        </div>
      </li>
    ))
  ) : (
    <div className="col-span-full text-center text-gray-500 py-10">
      <h1 className="text-lg font-medium">No workers found</h1>
    </div>
  )}
</ul>


    </div>
  )
}

export default Content
