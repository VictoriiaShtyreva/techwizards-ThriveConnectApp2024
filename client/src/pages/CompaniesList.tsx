import { useGetAllCompaniesQuery } from '@/redux/api/companySlice';
import { Link } from 'react-router-dom';

const CompaniesList = () => {
   const { data, error, isLoading } = useGetAllCompaniesQuery();
   
   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;
   if (!data) return <p>No job seekers found.</p>;

   console.log(data)
  return (
    <div>
      <ul>
         {data && data.map(job => (
            <li key={job.id}>
               <div>
                  {job.jobTitle}
               </div>
               <div>
                  {job.name}
               </div>
               <div>
                  {job.feedback.length > 0
                  ? <div>
                     {job.feedback.length} feedback(s):
                     <Link to={`/companies/${job.id}/feedbacks`}>
                        Show
                     </Link>
                  </div>
                  : <div>No feedbacks yet</div>}
               </div>
               <br/>
            </li>
         ))}
      </ul>
    </div>
  )
}

export default CompaniesList
