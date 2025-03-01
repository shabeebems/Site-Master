'use client'

import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { useRouter } from "next/navigation";
import Photos from "./components/AuthComponet";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
    const protect = useAppSelector(state => state.protect)
    const router = useRouter()

    useEffect(() => {
        if(protect.email) {
            router.push('/contractor/dashboard')
        }
    }, [protect.email])

    if(protect.email) return null

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row">
            <Photos />
            {children}
        </div>
    );
}