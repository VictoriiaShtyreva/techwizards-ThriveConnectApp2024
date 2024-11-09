import { Button } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import Globe from "@/components/ui/globe";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Find Your Dream Job</span>
                  <span className="block text-indigo-200">
                    Match Your Skills
                  </span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Discover opportunities that align with your skills and
                  aspirations. Our advanced matching algorithm ensures you find
                  the perfect fit for your career goals.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Button
                      size="lg"
                      className="flex items-center justify-center"
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center justify-center"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Globe Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Be happy at work globally!
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-gray-500">
                  Our platform connects you with job opportunities from around
                  the world. Whether you're looking for remote work or
                  considering relocation, we've got you covered with a diverse
                  range of international positions.
                </p>
                <div className="mt-8 sm:flex"></div>
              </div>
              <div className="mt-10 lg:mt-0 relative h-[600px]">
                <Globe className="absolute inset-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Marquee here */}
        <div className="bg-indigo-600 py-4">
          <Marquee className="text-white font-semibold" pauseOnHover={true}>
            <span className="mx-5 my-5">New job postings every day!</span>
            <span className="mx-5 my-5">Find your dream job today!</span>
            <span className="mx-5 my-5">Top companies are hiring now!</span>
            <span className="mx-5 my-5">
              Boost your career with our expert tips!
            </span>
          </Marquee>
        </div>
      </main>
    </div>
  );
}
