'use client'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import Photos from '../components/AuthComponet';
import OtpForm from './OtpForm';
import { useRouter } from 'next/navigation';


const page = () => {
  
  const router = useRouter()

  useEffect(() => {
      if (!Cookies.get('signup_verified')) {
          router.push('/contractor/register')
      }
  }, [])

  return (
    // <div className="min-h-screen w-full flex flex-col md:flex-row">
    //   <Photos />
      <OtpForm />     
    // </div>
  )
}

export default page