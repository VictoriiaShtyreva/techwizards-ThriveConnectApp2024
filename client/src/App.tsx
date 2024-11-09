import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />}/>
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
