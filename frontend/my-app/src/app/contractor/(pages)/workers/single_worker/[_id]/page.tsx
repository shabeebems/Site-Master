import React from 'react'
import Content from './Content';

interface PageProps {
    params: { [key: string]: string };
}

const Page: React.FC<PageProps> = async({ params }) => {
  const { _id } = await params

  return (
    <div>
      <Content workerId={_id} />
    </div>
  )
}

export default Page
