import React from 'react'

interface PageProps {
    params: { [key: string]: string };
}

const Page: React.FC<PageProps> = async({ params }) => {
  const { _id } = await params

  return (
    <div>
      { _id }
    </div>
  )
}

export default Page
