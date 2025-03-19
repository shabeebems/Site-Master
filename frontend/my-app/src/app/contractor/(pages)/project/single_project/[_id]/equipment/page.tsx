import React from 'react'
import Content from './Content';

interface PageProps {
    params: { [key: string]: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <>
      <Content projectId={params._id} />
    </>
  )
}

export default Page
