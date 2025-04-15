'use client';
import { fetchSingleData } from '@/app/api/api';
import React, { useEffect, useState } from 'react';

type PageProps = {
  workerId: any;
};

const Content: React.FC<PageProps> = ({ workerId }) => {
  const [worker, setWorker] = useState<any>({});
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchDetails = await fetchSingleData('get_single_worker', workerId);
        setHistory(fetchDetails?.workerHistory?.activities || []);
        setWorker(fetchDetails.worker || {});
        console.log(fetchDetails.workerHistory?.activities)
      } catch (error) {
        console.error('Error fetching worker:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
          {worker.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{worker.name}</h1>
          <p className="text-gray-500">{worker.role}</p>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
          <div>
            <p className="font-medium">Email</p>
            <p className="text-gray-600">{worker.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-gray-600">{worker.mobile}</p>
          </div>
          <div>
            <p className="font-medium">Position</p>
            <p className="text-gray-600">{worker.role}</p>
          </div>
          <div>
            <p className="font-medium">Place</p>
            <p className="text-gray-600">{worker.place}</p>
          </div>
        </div>
      </div>

      {/* Activity History Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Activity History</h2>
        {history.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((activity, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                <div className="text-gray-700 space-y-1">
                  <p><span className="font-medium">Date:</span> {new Date(activity.start).toLocaleDateString()} → {new Date(activity.end).toLocaleDateString()}</p>
                  <p><span className="font-medium">Project:</span> {activity.project}</p>
                  <p><span className="font-medium">Task:</span> {activity.task}</p>
                  <p><span className="font-medium">Status:</span> {activity.status}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No activity history available.</p>
        )}
      </div>

    </div>


  );
};

export default Content;
