'use client'

import { fetchSingleData } from '@/app/api/api';
import React, { useEffect, useState } from 'react'
import Content from './content';

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

const tasks = [
  { 
    name: "Foundation Work", 
    startDate: "2024-03-01", 
    endDate: "2024-05-15", 
    status: "in-progress" 
  },
  { 
    name: "Steel Framework Installation", 
    startDate: "2024-05-20", 
    endDate: "2024-08-30", 
    status: "planned" 
  }
];

const equipment = [
  { 
    name: "Tower Crane", 
    count: 2, 
    startDate: "2024-03-01", 
    expireDate: "2025-12-31" 
  },
  { 
    name: "Concrete Mixer", 
    count: 4, 
    startDate: "2024-02-15", 
    expireDate: "2024-12-31" 
  }
];


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
      <Content tasks={tasks} equipment={equipment} project={project} />
    </>
  );
}

export default Page
