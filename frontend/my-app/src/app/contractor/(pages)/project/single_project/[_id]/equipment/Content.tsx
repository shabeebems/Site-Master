import React from 'react'

type PageProps = {
    _id: any;
};

const Content: React.FC<PageProps> = ({ _id }) => {
  return (
    <div>
      {_id}1212
    </div>
  )
}

export default Content
