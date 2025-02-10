import { Routes, Route } from "react-router-dom";
import SigninPage from "../pages/auth/SigninPage";
import SignupPage from "../pages/auth/SignupPage";

const RoutesWrapper = () => {
  return (
    <div className="container mx-auto mt-12 px-6 lg:px-12">
      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default RoutesWrapper;
