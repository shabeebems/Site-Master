'use client'

import React from 'react'

// Api for logout (Clearing tokens on backend)
import { logoutApi } from '@/app/api/api';

import { useAppDispatch } from '@/app/store/hooks';

// Google authentication signOut
import { signOut } from 'next-auth/react';

// Redux to clear email for logout
import { clearProtect } from '@/app/store/protect';

// React icons
import { BiLogOut } from "react-icons/bi";

// Props to recieve datas from parent
type NavbarProps = {
  active: string;
};


const Navbar: React.FC<NavbarProps> = ({ active }) => {

  const dispatch = useAppDispatch()

  const logout = async() => {
    await signOut()
    // Calling logout api
    await logoutApi()
    // Clear email from redux
    dispatch(clearProtect())
  }

  return (
    <nav className="flex items-center justify-between p-5 bg-white shadow-md h-16">
      <h1 className="text-xl font-semibold text-blue-950">{active}</h1>
      <div className="flex items-center gap-6">
          {/* <img src="/arrow.png" alt="Search" className="w-6 h-6 cursor-pointer" />
          <img src="/arrow.png" alt="Search" className="w-6 h-6 cursor-pointer" /> */}
          <div className="flex items-center gap-2">
            <img src="/profile.jpeg" alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
            <span className="text-blue-950 font-medium hidden md:block">Shabeeb</span>
            <BiLogOut
              onClick={logout} 
              color='#030032' size={20}  className='cursor-pointer'
            />
          </div>
      </div>
  </nav>
  )
}

export default Navbar
