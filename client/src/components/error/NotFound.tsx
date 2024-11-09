import NotFoundImg from "@/assets/notfound.png";

export const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <img src={NotFoundImg} alt="Not Found" className="w-1/2 md:w-1/4 mb-6" />
    <h2 className="text-2xl font-bold mb-2">Oops! Nothing was found.</h2>
    <p className="text-gray-600">
      Try adjusting your search, category, or tags to find relevant resources.
    </p>
  </div>
);
