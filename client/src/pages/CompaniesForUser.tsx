import { useGetCompanyByIdQuery } from '@/redux/api/companySlice'
import { useParams } from 'react-router-dom';

const CompaniesForUser = () => {
   const { id } = useParams<{id: string}>();
   const { data, error, isLoading } = useGetCompanyByIdQuery(id!);

   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;
   if (!data) return <p>No job seekers found.</p>;

   console.log(data);

  return (
    <div>
      
    </div>
  )
}

export default CompaniesForUser
