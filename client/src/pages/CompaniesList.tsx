import { useGetAllCompaniesQuery } from '@/redux/api/companySlice';
import { Link } from 'react-router-dom';

const CompaniesList = () => {
   const { data, error, isLoading } = useGetAllCompaniesQuery();
   
   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;
   if (!data) return <p>No job seekers found.</p>;

   console.log(data)
   return (
      <div className="container mx-auto p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data &&
            data.map((job) => (
              <li key={job.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="text-xl font-semibold text-gray-800 mb-2">
                  {job.jobTitle}
                </div>
                <div className="text-gray-600 mb-4">
                  {job.name}
                </div>
                <div className="text-gray-700">
                  {job.feedback.length > 0 ? (
                    <div className="flex items-center justify-between">
                      <span>{job.feedback.length} feedback(s)</span>
                      <Link
                        to={`/companies/${job.id}/feedbacks`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                      >
                        Show
                      </Link>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">No feedbacks yet</div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
    
}

export default CompaniesList
