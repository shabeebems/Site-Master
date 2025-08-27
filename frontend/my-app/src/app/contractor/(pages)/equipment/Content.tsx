'use client'

import { useCallback, useEffect, useState } from "react"
import AddForm from "./AddForm"
import { fetchPaginationDetails } from "@/app/api/api"
import PaginationPage from "@/app/components/Pagination";
import { useRouter } from "next/navigation";
import { Package, TrendingUp, Wrench, MapPin, Plus, Sparkles } from 'lucide-react';

// For display equipment details
interface IEquipment {
  _id: string;
  tool: string;
  available: number;
  onSite: number;
}

const Content = () => {
    // State to manage new equipment adding form (Show form while true)
    const [add, setAdd] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

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
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Call api to get equipment
        const fetchDetails = await fetchPaginationDetails('get_equipment', currentPage, itemsPerPage);

        // Store equipment details to state
        setTools(fetchDetails.equipment);
        setTotalEquipmentCount(fetchDetails.totalEquipmentCount)
        console.log(fetchDetails.equipment)
      } catch (error) {
        console.error("Error fetching workers:", error);
      } finally {
        setIsLoading(false)
      }
    };

    useEffect(() => {
      // Call function
      fetchData();

    }, [currentPage])

  // Add latest added equipment to state to display (Passing to child component(AddForm))
  const handleEquipmentAdded = () => {
    fetchData()
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-200 rounded-xl"></div>
            <div className="h-16 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6'>
        
        {/* Animated Header Section */}
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


      <div className="max-w-7xl mx-auto">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Available</p>
                <p className="text-xl font-bold text-gray-800">{tools.reduce((sum, tool) => sum + tool.available, 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">On-Site</p>
                <p className="text-xl font-bold text-gray-800">{tools.reduce((sum, tool) => sum + tool.onSite, 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                <Wrench className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Equipment Types</p>
                <p className="text-xl font-bold text-gray-800">{tools.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Cards */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : tools && tools.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tools.map((tool, index) => (
              <div
                key={tool._id}
                onClick={() => router.push(`equipment/single_equipment/${tool._id}`)}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/20 cursor-pointer transform hover:-translate-y-2 transition-all duration-500 hover:bg-white relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                        {tool.tool}
                      </h3>
                      <p className="text-sm text-gray-500">Equipment #{index + 1}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Available */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 group-hover:from-green-100 group-hover:to-emerald-100 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-700 uppercase tracking-wide">Available</span>
                      </div>
                      <div className="text-2xl font-bold text-green-800">{tool.available}</div>
                    </div>

                    {/* On-Site */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">On-Site</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-800">{tool.onSite}</div>
                    </div>
                  </div>

                  {/* Utilization Bar */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">Utilization</span>
                      <span className="text-xs font-bold text-gray-800">
                        {Math.round((tool.onSite / (tool.available + tool.onSite)) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${(tool.onSite / (tool.available + tool.onSite)) * 100}%`,
                          transform: 'translateX(-100%)',
                          animation: 'slideIn 1s ease-out forwards'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Equipment Found</h3>
                <p className="text-gray-500">Start by adding your first equipment item</p>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center">
          <PaginationPage 
            count={Math.ceil(totalEquipmentCount / itemsPerPage)}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Content