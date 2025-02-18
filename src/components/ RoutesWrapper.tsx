import { Routes, Route } from "react-router-dom";
import SigninPage from "../pages/auth/SigninPage";
import SignupPage from "../pages/auth/SignupPage";
import HomePage from "../pages/home/HomePage";
import BookingPage from "../pages/booking/BookingPage";
import BookingSinglePage from "../pages/booking/[id]";

const RoutesWrapper = () => {
  return (
    <div className=" mt-12 px-6 lg:px-12">
      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/:id" element={<BookingSinglePage />} />
      </Routes>
    </div>
  );
};

export default RoutesWrapper;
