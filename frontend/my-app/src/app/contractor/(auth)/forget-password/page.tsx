import ForgetPasswordForm from '@/app/components/ForgetPasswordForm'
import React from 'react'

const Page = () => {

  const role: string = 'Contractor'

  return (
    <ForgetPasswordForm role={role} />
  )
}

export default Page
