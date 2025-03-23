'use client'

import { fetchDetails, simpleEdits } from '@/app/api/api';
import React, { useEffect, useState } from 'react'
import moment from "moment"; // Import Moment.js
import Swal from "sweetalert2"; // Import SweetAlert2

interface IEquipment {
  name: string;
  startingDate: Date;
  endingDate: Date;
  taskName: string;
  count: number;
  _id: string;
  taskId: string;
  equipmentId: string
  status: string
}

type PageProps = {
  projectId: any;
};

const Content: React.FC<PageProps> = ({ projectId }) => {

  const [equipment, setEquipment] = useState<IEquipment[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getEquipment = await fetchDetails(`get_taskEquipment/${projectId}`);
        setEquipment(getEquipment)
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };
  
    // Call function
    fetchData();
  }, [])

  const onAction = async(returnEquipment: IEquipment) => {
    const status = returnEquipment.status
    try {
      Swal.fire({
        title: `Are you sure?`,
        text: `You are about to this equipment!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#6c757d",
        confirmButtonText: `Yes, ${status === 'Pending' ? 'Use' : "Return"} it!`,
      }).then(async(result) => {
        if (result.isConfirmed) {
          const { _id, taskId, count, equipmentId, status } = returnEquipment
          const getEquipment = await simpleEdits(`return_equipment`, { _id, taskId, count, equipmentId, status });
        }
      });
    } catch (error) {
      console.error("Error while return equipment:", error);
    }
  }

  return (
<div className="overflow-x-auto p-4">
      <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left text-sm md:text-base">
            <th className="p-4">Equipment</th>
            <th className="p-4">Task Name</th>
            <th className="p-4">Count</th>
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 transition">
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.taskName}</td>
              <td className="p-4">{item.count}</td>
              <td className="p-4">{moment(item.startingDate).calendar()}</td>
              <td className="p-4">{moment(item.endingDate).calendar()}</td>
              <td className="p-4">{item.status}</td>
              <td className="p-4 flex gap-3 justify-center">
                {item.status === 'Active' ? (
                  <button
                    onClick={() => onAction(item)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105"
                  >
                    Return
                  </button>
                ) : (
                  item.status === 'Pending' ? (
                    <button
                      onClick={() => onAction(item)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105"
                    >
                      Use
                    </button>
                  ) :
                  <p className="text-gray-600 font-medium">N/A</p>
                )}
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Content
