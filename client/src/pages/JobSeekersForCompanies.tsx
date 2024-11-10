import { useGetCompanyByIdQuery } from '@/redux/api/companySlice';
import { useGetAllJobSeekersQuery } from '@/redux/api/jobseekerSlice';
import React from 'react'
import { useParams } from 'react-router-dom';

const JobSeekersForCompanies = () => {
   const { id } = useParams<{id: string}>();

   const { data: companyData, error: companyError, isLoading: isCompanyLoading } = useGetCompanyByIdQuery(id!);
   const { data: jobSeekerData, error: jobSeekerError, isLoading: isJobSeekerLoading } = useGetAllJobSeekersQuery();

   if (isCompanyLoading || isJobSeekerLoading) return <div>Loading...</div>;
   if (companyError || jobSeekerError) return <div>Error loading data.</div>;

   const jobSeekers = jobSeekerData || [];

   const matchingJobSeekerIds = companyData?.matchingList.map((company) => company.jobSeekerId) || [];
   const matchingJobSeekers = jobSeekers.filter((jobSeeker) => matchingJobSeekerIds.includes(jobSeeker.id));

   console.log(matchingJobSeekers)
   
   return (
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Matching Job Seekers</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchingJobSeekers.map((jobSeeker) => (
            <li key={jobSeeker.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <div className="text-lg font-bold text-gray-800">{jobSeeker.name}</div>
              <div className="text-gray-600">Experience: {jobSeeker.experience}</div>
              <div className="text-gray-700">Skills: {jobSeeker.skills?.join(", ")}</div>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default JobSeekersForCompanies
