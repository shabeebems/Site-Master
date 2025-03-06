'use client'

import { useEffect } from "react"
import { useAppDispatch } from "@/app/store/hooks";
import { setProtect } from "@/app/store/protect";

// To get google autheticated details
import { useSession } from "next-auth/react";

import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {

  // To get google autheticated details
  const { data: session } = useSession();

  const dispatch = useAppDispatch()

  useEffect(() => {
    if(session) {
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