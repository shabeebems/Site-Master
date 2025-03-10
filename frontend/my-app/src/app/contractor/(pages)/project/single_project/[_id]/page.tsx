import React from 'react'

interface PageProps {
    params: { [key: string]: string };
}

const Page: React.FC<PageProps>  = ({params}) => {
  return (
    <>
      {params._id}
    </>
  )
}

export default Page
