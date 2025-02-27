'use client'

import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
    const protect = useAppSelector(state => state.protect)
    const router = useRouter()

    useEffect(() => {
        if(protect.email) {
            router.push('/dashboard')
        }
    }, [protect.email])

    if(protect.email) return null

    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}