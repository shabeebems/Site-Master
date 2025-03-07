'use client'

import { useEffect } from "react"
// Redux hook
import { useAppDispatch } from "@/app/store/hooks";
import { setProtect } from "@/app/store/protect";

// To get google autheticated details
import { signOut, useSession } from "next-auth/react";

import LoginForm from '@/app/components/LoginForm';
import { apiCheck } from "@/app/api/api";


export default function LoginPage() {

    // To get google autheticated details
    const { data: session } = useSession();

    const dispatch = useAppDispatch()

    // For google authentication
    useEffect(() => {
      const checkGoogleAuth = async() => {
        // Calling the api to check user and create tokens
        const response = await apiCheck({ email: session?.user?.email, name: session?.user?.name }, 'auth/check_google_auth')
        if(response.success) {
          // Adding google authenticated user details to redux
          dispatch(setProtect({ email: session?.user?.email, role: 'Contractor' }))
        } else {
          signOut()
        }
      }

      if(session) {
        checkGoogleAuth()
      }
    }, [session])

    const role: string = 'Contractor'

    return (
        // <Photos />
        <LoginForm role={role} />
    );
}