import React from 'react'
import Content from './components/Content'

interface PageProps {
  params: { [key: string]: string };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { _id } = await params
  return (
    <>
      <Content equipmentId={_id} />
    </>
  )
}

export default Page
