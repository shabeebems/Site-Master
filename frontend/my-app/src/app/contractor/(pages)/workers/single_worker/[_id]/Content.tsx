'use client';
import { apiCheck, fetchSingleData } from '@/app/api/api';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from './EditForm';

type PageProps = {
  workerId: any;
};

const Content: React.FC<PageProps> = ({ workerId }) => {
  const [worker, setWorker] = useState<any>({});
  const [history, setHistory] = useState<any[]>([]);
  const [editDisplay, setEditDisplay] = useState<boolean>(false)

  const exitEditForm = () => setEditDisplay(false)

  const edit = (editWorker: any, success: boolean) => {
    if(success) {
      const { name, place, profession } = editWorker
      setWorker({ ...worker, name, place, profession })
      setEditDisplay(false)
      toast.success('Worker updated successfully', { position: "top-right" });
    } else {
      toast.error('Worker updated Failed', { position: "top-right" });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchDetails = await fetchSingleData('get_single_worker', workerId);
        setHistory(fetchDetails?.workerHistory?.activities || []);
        setWorker(fetchDetails.worker || {});
        console.log(fetchDetails.worker)
      } catch (error) {
        console.error('Error fetching worker:', error);
      }
    };

    fetchData();
  }, []);

  const handleImage = (e: any) => {
    const files = e.target.files[0]
    if(files.size > 2 * 1024 * 1024) {
        e.target.value = ''
        toast.error('Image size must be less than 2 mb', { position: "top-right", });
    } else {
        setFileToBase(files)
    }
  }

  // Updating image
  const setFileToBase = async(file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async() => {
      const response = await apiCheck({ image: reader.result, _id: worker._id }, 'contractor/add_worker_image')
      if (response?.data?.image) {
        setWorker((prev: any) => ({
          ...prev,
          image: response.data.image, // Update worker's image instantly
        }));
        toast.success('Image updated successfully', { position: "top-right" });
        return
      }
      toast.error('Image updation failed', { position: "top-right" });
    };
  };

  return (
    <div className="mx-auto pl-6 space-y-8">
      <ToastContainer />
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <div className="relative w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
          {!worker?.image ? worker.name?.charAt(0).toUpperCase() : <img src={worker?.image} className="w-full h-full object-cover rounded-full" /> }
          <label className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center cursor-pointer hover:bg-blue-600">
            +
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{worker.name}</h1>
          <p className="text-gray-500">{worker.profession}</p>
        </div>
      </div>


      {/* Personal Info Section */}
      <div className="bg-white shadow-md rounded-xl p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
          {editDisplay ? (
            <EditForm exit={exitEditForm} worker={worker} edit={edit} />
          ) : (
            <button
              onClick={() => setEditDisplay(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-3 py-1.5 shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-1 rounded-xl"
            >
              Edit
            </button>
          )}
        </div>

        {/* Info Content */}
        <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
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
            <p className="text-gray-600">{worker.profession}</p>
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
              <li key={index} className="bg-blue-50 p-4 rounded-2xl shadow-sm">
                <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(activity.start).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} →{' '}
                  {new Date(activity.end).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
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
