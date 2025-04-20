import { fetchSingleData } from '@/app/api/api';
import React, { useEffect } from 'react'

interface PageProps {
    equipmentId: string;
}

const Content: React.FC<PageProps> = ({ equipmentId }) => {

  useEffect(() => {
    const fetchData = async () => {      
      const fetchDetails = await fetchSingleData('get_single_equipment', equipmentId);

    }
    fetchData()
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default Content
