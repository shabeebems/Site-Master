'use client'

import { useEffect } from "react"
// Redux hook
import { useAppDispatch } from "@/app/store/hooks";
import { setProtect } from "@/app/store/protect";

// To get google autheticated details
import { useSession } from "next-auth/react";

import LoginForm from '@/app/components/LoginForm';
import { apiCheck } from "@/app/api/api";


export default function LoginPage() {

    // To get google autheticated details
    const { data: session } = useSession();

    const dispatch = useAppDispatch()

    useEffect(() => {

      const checkGoogleAuth = async() => {
          await apiCheck({ email: session?.user?.email, name: session?.user?.name }, 'auth/check_google_auth')
      }

      if(session) {
        checkGoogleAuth()
        // Adding google authenticated user details to redux
        dispatch(setProtect({ email: session?.user?.email, role: 'Contractor' }))
        
      }
    }, [session])

    const role: string = 'Contractor'

    return (
        // <Photos />
        <LoginForm role={role} />
    );
}