import LoginForm from '@/app/components/LoginForm';
import React from 'react'

const Page = () => {
  const role: string = 'Worker'

  return (
    <LoginForm role={role} />
  )
}
 
export default Page
