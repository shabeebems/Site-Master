'use client'

import { fetchSingleData, simpleEdits } from '@/app/api/api';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PageProps {
    equipmentId: string;
}

const Content: React.FC<PageProps> = ({ equipmentId }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleIncrease = () => {
    setEquipment((prev: any) => ({ 
      ...prev,
      count: prev.count + 1,
      available: prev.available + 1
    }));
  };
  
  const handleDecrease = () => {
    if(equipment.available > 0)
    setEquipment((prev: any) => ({
      ...prev,
      count: prev.count > 0 ? prev.count - 1 : 0,
      available: prev.available - 1,
    }));
  };

  const handleEdit = async () => {
    if(isEditMode) {
      const response = await simpleEdits('edit_equipment_count', { count: equipment.count, _id: equipment._id, available: equipment.available })
      if(response?.data?.success) {
        toast.success(response.data.message, { position: "top-right", });
      } else {
        toast.error("Equipment Count editing failed", { position: "top-right", });
      }
    }
    setIsEditMode(prev => !prev)
  };
  
  const [equipment, setEquipment] = useState<any>({})
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {      
      const fetchDetails = await fetchSingleData('get_single_equipment', equipmentId);
      setEquipment(fetchDetails.equipment)
      setHistory(fetchDetails.history)
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <ToastContainer />
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-2xl shadow-xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white text-yellow-600 flex items-center justify-center text-3xl font-bold shadow-inner">
              {equipment?.tool?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold capitalize">{equipment.tool}</h1>
              <p className="text-sm opacity-90">Equipment Details</p>
            </div>
          </div>

          {/* Edit/Save Button */}
          <button
            onClick={handleEdit}
            className="px-5 py-2 bg-white text-yellow-600 font-semibold text-sm rounded-full shadow hover:bg-yellow-100 transition"
          >
            {isEditMode ? "Save" : "Edit"}
          </button>
        </div>

        {/* Equipment Info */}
        <div className="grid grid-cols-3 gap-6 text-sm">
          {/* Total Count */}
          <div className="bg-white/20 p-4 rounded-xl shadow-md text-center">
            <p className="font-medium mb-2">Total Count</p>
            {isEditMode ? (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleDecrease}
                  className="w-8 h-8 bg-white text-yellow-600 rounded-full font-bold hover:bg-yellow-100"
                >
                  −
                </button>
                <span className="text-xl font-semibold">{equipment.count}</span>
                <button
                  onClick={handleIncrease}
                  className="w-8 h-8 bg-white text-yellow-600 rounded-full font-bold hover:bg-yellow-100"
                >
                  +
                </button>
              </div>
            ) : (
              <p className="text-xl font-semibold">{equipment.count}</p>
            )}
          </div>

          {/* Available */}
          <div className="bg-white/20 p-4 rounded-xl shadow-md text-center">
            <p className="font-medium mb-2">Available</p>
            <p className="text-xl font-semibold">{equipment.available}</p>
          </div>

          {/* On Site */}
          <div className="bg-white/20 p-4 rounded-xl shadow-md text-center">
            <p className="font-medium mb-2">On Site</p>
            <p className="text-xl font-semibold">{equipment.onSite}</p>
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div className="bg-gradient-to-br from-white to-orange-800 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Activity History
          </h2>
        </div>

        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((activity, index) => (
              <div
                key={index}
                className="group relative p-5 rounded-xl bg-white border border-blue-50 hover:border-purple-200 transition-all duration-200 hover:shadow-xs shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Timeline indicator */}
                  <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 to-purple-200 sm:left-7 sm:top-5 sm:bottom-5"></div>
                  <div className="relative flex-shrink-0 w-4 h-4 mt-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white shadow-sm sm:mt-0.5"></div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-gray-800">{activity.task}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium shadow-xs ${
                          activity.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : activity.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-600 mb-1 font-semibold">Project</p>
                        <p className="text-blue-800 font-medium">{activity.project}</p>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-xs text-purple-600 mb-1 font-semibold">Duration</p>
                        <p className="text-purple-800 font-medium">
                          {new Date(activity.start).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          -{' '}
                          {new Date(activity.end).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-xs text-amber-600 mb-1 font-semibold">Count</p>
                        <p className="text-amber-800 font-medium">{activity.count}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover actions */}
                {/* <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button className="p-1.5 text-blue-500 hover:text-white hover:bg-blue-500 rounded-full shadow-sm transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-rose-500 hover:text-white hover:bg-rose-500 rounded-full shadow-sm transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl border border-dashed border-blue-200">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-800">No activity history</h3>
            <p className="mt-1 text-sm text-gray-600 max-w-md">This equipment doesn't have any recorded activity yet.</p>
            <button className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all shadow-sm">
              Add Activity
            </button>
          </div>
        )}
      </div>




    </div>
  
  )
}

export default Content
