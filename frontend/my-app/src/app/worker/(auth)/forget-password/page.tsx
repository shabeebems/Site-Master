import ForgetPasswordForm from '@/app/components/ForgetPasswordForm'
import React from 'react'

const page = () => {
  const role: string = 'Worker'
  return (
    <ForgetPasswordForm role={role} />
  )
}

export default page
