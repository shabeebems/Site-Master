import LoginForm from '@/app/contractor/(auth)/login/LoginForm'
import React from 'react'

const Page = () => {
  const role: string = 'Worker'

  return (
    <LoginForm role={role} />
  )
}

export default Page
