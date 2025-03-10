'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';

// React icons
import { MdOutlineDashboard } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { GrUserWorker } from "react-icons/gr";
import { VscTools } from "react-icons/vsc";
import { MdOutlineMessage } from "react-icons/md";
import { LuCircleUser } from "react-icons/lu";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";


// Props to recieve datas from parent
type SidebarProps = {
  active: string;
};

const Sidebar: React.FC<SidebarProps> = ({ active }) => {

  // For small screen
  useEffect(() => {
    if (window.innerWidth < 640) {
      // Can't open sidebar in small screen devices 
      setOpen(false)
    }
  },[])

  // To manage sidebar
  const [open, setOpen] = useState(true)

  const router = useRouter()

  // Sidebar details
  const menus = [
    { title: 'Dashboard', path: '/contractor/dashboard', icon: <MdOutlineDashboard color='#030032' /> },
    { title: 'Project', path: '/contractor/project', icon: <BiTask color='#030032' /> },
    { title: 'Workers', path: '/contractor/workers', icon: <GrUserWorker color='#030032' />},
    { title: 'Equipment', path: '/contractor/equipment', icon: <VscTools color='#030032' />},
    { title: 'Messages', path: '/contractor/messages', icon: <MdOutlineMessage color='#030032' />},
    { title: 'Profile', path: '/contractor/profile', icon: <LuCircleUser color='#030032' />},
  ]

  
  return (
      <div 
        className={`${open ? 'w-56 lg:w-72' : 'w-20'}
        duration-300 h-screen p-5 pt-8 bg-white shadow-2xl relative`}>
          {/* <img
            onClick={() => open ? setOpen(false) : setOpen(true)} src="/arrow.png"
            className={ `absolute cursor-pointer right-[-14px] top-9 w-7 border-2 border-indigo-900 rounded-full ${open && 'rotate-180'} hidden sm:block` }
          /> */}
          <div className='flex gap-4 items-center'>
              <img
                onClick={() => window.innerWidth > 640 && setOpen(true)}
                src="/logo.png" className={`cursor-pointer duration-500 w-16 ${open && 'rotate-[360deg]'}`} 
              />
              <h1 
                className={`text-blue-950 origin-left font-medium text-xl duration-300
                ${ !open && 'scale-0' }`}>
                Contractor
              </h1>
              {/* <img 
                src="/arrow.png"
                onClick={() => open ? setOpen(false) : setOpen(true)}
                className={`w-7 cursor-pointer border-2 border-indigo-900 rounded-full ${open && 'rotate-180'} ${!open && 'hidden'}`} 
              /> */}
              <div>
                <FaPersonWalkingArrowRight
                  onClick={() => setOpen(false)}
                  size={30} color='#030032' className={`cursor-pointer ${!open && 'hidden'}`} />
              </div>

          </div>
          <ul className="pt-6 space-y-3">
            {menus.map((menu, index) => (
              <li
                key={index}
                // push to clicked route
                onClick={() => router.push(menu.path)}
                className={`flex items-center gap-x-4 p-3 rounded-xl cursor-pointer transition-all duration-300 shadow-md bg-white
                ${menu.title === active ? 'bg-gradient-to-r from-white to-gray-200 shadow-lg' : 'hover:bg-gray-100 hover:scale-[1.05] hover:shadow-lg'}
                `}
              >
                { menu.icon }
                <span className={`${!open && 'hidden'} origin-left transition-all duration-200 text-indigo-950 text-base font-semibold`}>
                  {menu.title}
                </span>
              </li>
            ))}
          </ul>
      </div>
  )
}

export default Sidebar
