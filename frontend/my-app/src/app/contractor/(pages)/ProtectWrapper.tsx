'use client'

import { useEffect } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";


const ProtectWrapper = ({ children }: { children: React.ReactNode }) => {

  const protect = useAppSelector(state => state.protect)
  const router = useRouter()

  useEffect(() => {
        if(!protect.email) {
          router.push('/contractor/login')
        } else if(protect.role === 'Worker') {
          router.push('/worker/dashboard')
        }
    }, [protect.email])

    if(!protect.email || protect.role === 'Worker') return null

    return <>{children}</>

}

export default ProtectWrapper
