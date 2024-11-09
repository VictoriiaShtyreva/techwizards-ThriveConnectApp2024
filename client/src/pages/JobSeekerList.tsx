import { useGetAllJobSeekersQuery } from '@/redux/api/jobseekerSlice';
import React from 'react'

const JobSeekerList = () => {
   const { data, error, isLoading } = useGetAllJobSeekersQuery();

   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;
   if (!data) return <p>No job seekers found.</p>;

   console.log(data)
   
  return (
   <div>
      <ul>
      {data && data.map(jobSeeker => (
         <ul key={jobSeeker.id}>
            <li>{jobSeeker.name}</li>
         </ul>
      ))}
      </ul>
   </div>
  )
}

export default JobSeekerList
