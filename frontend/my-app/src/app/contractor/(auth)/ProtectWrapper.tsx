'use client'

import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { useRouter } from "next/navigation";

const ProtectWrapper = ({ children }: { children: React.ReactNode }) => {
    const protect = useAppSelector(state => state.protect)
    const router = useRouter()

    useEffect(() => {
        if(protect.email) {
            if(protect.role === 'Contractor') {
                router.push('/contractor/dashboard')
            } else if(protect.role === 'Worker') {
                router.push('/worker/dashboard')
            }
        }
    }, [protect.email])

    if(protect.email) return null
    
    return <>{children}</>
}

export default ProtectWrapper
