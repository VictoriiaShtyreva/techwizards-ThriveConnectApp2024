import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={logo} alt="ThriveConnect Logo" className="h-10 w-15" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/jobs"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Find Jobs
              </Link>
              <Link
                to="/companies"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Companies
              </Link>
              <Link
                to="/resources"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Resources
              </Link>
            </div>
          </div>
          <Link to="/login">
          <Button variant="outline">Sign In</Button><div className="hidden sm:ml-6 sm:flex sm:items-center">
          </div>
          </Link>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
}
