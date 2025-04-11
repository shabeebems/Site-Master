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
      } catch (error) {
        console.error('Error fetching worker:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Worker Details</h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <p><strong>Name:</strong> {worker.name}</p>
        <p><strong>Email:</strong> {worker.email}</p>
        <p><strong>Phone:</strong> {worker.phone}</p>
        <p><strong>Position:</strong> {worker.position}</p>
        {/* Add more fields as needed */}
      </div>

      <h2 className="text-xl font-semibold mb-2">Activity History</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        {history.length > 0 ? (
          <ul className="space-y-3">
            {history.map((activity, index) => (
              <li key={index} className="border-b pb-2">
                <p><strong>Date:</strong> {activity.date}</p>
                <p><strong>Project:</strong> {activity.projectName}</p>
                <p><strong>Role:</strong> {activity.role}</p>
                {/* Add more fields if needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No activity history available.</p>
        )}
      </div>
    </div>
  );
};

export default Content;
