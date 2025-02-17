import { Routes, Route } from "react-router-dom";
import SigninPage from "../pages/auth/SigninPage";
import SignupPage from "../pages/auth/SignupPage";
import HomePage from "../pages/home/HomePage";

const RoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/login" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default RoutesWrapper;
