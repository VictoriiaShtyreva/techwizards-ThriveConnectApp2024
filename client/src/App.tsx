import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import ResourcesPage from "./pages/ResourcesPage";
import LoginPage from "./pages/LoginPage";
import SignUpSelectionPage from "./pages/SignUpSelectionPage";
import JobSeekerSignUpPage from "./pages/JobSeekerSignUpPage";
import CompanySignUpPage from "./pages/CompanySignUpPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpSelectionPage />} />
          <Route path="/signup/jobseeker" element={<JobSeekerSignUpPage />} />
          <Route path="/signup/company" element={<CompanySignUpPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        transition={Slide}
      />
    </div>
  );
}

export default App;
