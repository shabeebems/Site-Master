import React from 'react'
import Content from './Content';

interface PageProps {
  params: { [key: string]: string };
}

const Page: React.FC<PageProps>  = async({params}) => {
  const { taskId } = await params

  return (
    <>
      <Content _id={taskId} />
    </>
  )
}

export default Page
