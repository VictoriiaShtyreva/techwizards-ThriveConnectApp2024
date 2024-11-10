import { useGetAllCompaniesQuery } from '@/redux/api/companySlice'
import { useGetJobSeekerByIdQuery } from '@/redux/api/jobseekerSlice';
import { useParams } from 'react-router-dom';

const CompaniesForUser = () => {
  const { id } = useParams<{id: string}>();

  const { data: jobSeekerData, error: jobSeekerError, isLoading: isJobSeekerLoading } = useGetJobSeekerByIdQuery(id!);
  const { data: companiesData, error: companiesError, isLoading: isCompaniesLoading } = useGetAllCompaniesQuery();

  if (isJobSeekerLoading || isCompaniesLoading) return <div>Loading...</div>;
  if (jobSeekerError || companiesError) return <div>Error loading data.</div>;

  const companies = companiesData || [];

  const matchingCompanyIds = jobSeekerData?.matchingList.map((company) => company.companyId) || [];
  const matchingCompanies = companies.filter((company) => matchingCompanyIds.includes(company.id));

  console.log(matchingCompanies)

  return (
    <div className="flex items-center justify-center min-h-screen"> {/* Centers the cards and adds top margin */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-5xl">
        {matchingCompanies && matchingCompanies.map((company, index) => (
          <li
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{company.jobTitle}</h3>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Company:</span> {company.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Experience Required:</span> {company.experienceRequired} years
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default CompaniesForUser
