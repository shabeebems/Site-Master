import React from 'react'

const AddTask = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800">Add New Project</h2>

            {/* Project Title */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Project Title</label>
                <input
                    type="text"
                    name="name"
                    // value={newProject.name}
                    // onChange={handleChange}
                    placeholder="Enter project title"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Location */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                <input
                    type="text"
                    name="location"
                    // value={newProject.location}
                    // onChange={handleChange}
                    placeholder="Enter project location"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Start Date */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                <input
                    type="date"
                    name="startingDate"
                    // value={newProject.startingDate}
                    // onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // Restricts past dates
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* End Date */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                <input
                    type="date"
                    name="endingDate"
                    // value={newProject.endingDate}
                    // onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // Restricts past dates
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Image */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    // onChange={handleImage}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
                <div>
                    <button 
                        className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        >
                        Cancel
                    </button>
                    <button
                        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddTask
