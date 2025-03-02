'use client'
// import Aoth

import Photos from "@/app/components/AuthPhoto";
import { useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const protect = useAppSelector(state => state.protect)
    const router = useRouter()

    useEffect(() => {
        if(!protect.email) {
          router.push('/worker/login')
        } else if(protect.role === 'Contractor') {
          router.push('/contractor/dashboard')
        }
    }, [protect.email])

    if(!protect.email || protect.role === 'Contractor') return null

    return (
        <>
        {children}
        </>
    )

  }