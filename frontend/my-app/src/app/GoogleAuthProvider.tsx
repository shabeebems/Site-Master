'use client'

import { SessionProvider } from 'next-auth/react'

const GoogleAuthProvider = ({children}: {children: React.ReactNode}) => {
  return <SessionProvider> {children}</SessionProvider>
}

export default GoogleAuthProvider
