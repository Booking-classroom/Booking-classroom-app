import { Routes, Route } from "react-router-dom";
import SigninPage from "../pages/auth/SigninPage";
import SignupPage from "../pages/auth/SignupPage";
import HomePage from "../pages/home/HomePage";

const RoutesWrapper = () => {
  return (
    <div className="container mx-auto mt-12 px-6 lg:px-12">
      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default RoutesWrapper;
