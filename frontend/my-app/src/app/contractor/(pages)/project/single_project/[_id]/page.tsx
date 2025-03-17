'use client'

import { fetchSingleData } from '@/app/api/api';
import React, { useEffect, useState } from 'react'

interface PageProps {
    params: { [key: string]: string };
}

interface Project {
  name: string;
  location: string;
  status: string;
  startingDate: Date;
  endingDate: Date;
  _id: any;
  image: string;
}

const Page: React.FC<PageProps>  = ({params}) => {

  const [project, setProject] = useState<Project>()

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Call api to get projects
        const getProject = await fetchSingleData('get_single_project', params?._id);
        // Store projects details to state
        setProject(getProject);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    // Call function
    fetchData();
  }, [])

  return (
    <>
      {project?.name}
    </>
  )
}

export default Page
