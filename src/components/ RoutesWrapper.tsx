import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SigninPage from "../pages/auth/SigninPage";
import SignupPage from "../pages/auth/SignupPage";
import HomePage from "../pages/home/HomePage";
import BookingPage from "../pages/booking/BookingPage";
import BookingSinglePage from "../pages/booking/[id]";
import Classroom from "../pages/admin/classroom";


const RoutesWrapper = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isAdmin, setIsAdmin] = useState(false);

  const checkToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const tokenData = token.split('.')[1];
        const decodedToken = atob(tokenData);
        const parsedToken = JSON.parse(decodedToken);
        if (parsedToken) {
          setIsAuthenticated(true);
          if (parsedToken.role === "admin") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

   useEffect(() => {
      checkToken();
      window.addEventListener("storage", checkToken);
      return () => {
        window.removeEventListener("storage", checkToken);
      };
    }, []);


  return (
    <div className=" mt-12 px-6 lg:px-12">
      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/:id" element={<BookingSinglePage />} />
        <Route path="/classroom" element={<Classroom isAdmin={isAdmin}/>} />   
      </Routes>
    </div>
  );
};

export default RoutesWrapper;
