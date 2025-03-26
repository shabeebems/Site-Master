'use client'
import React from 'react'
import Content from './Content';

interface PageProps {
  params: { [key: string]: string };
}

const Page: React.FC<PageProps>  = ({params}) => {
  return (
    <>
      <Content _id={params.taskId} />
    </>
  )
}

export default Page
