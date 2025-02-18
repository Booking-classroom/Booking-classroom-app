import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserType } from "../types/user.type";
import SigninPage from "../pages/auth/SigninPage";
import SignupPage from "../pages/auth/SignupPage";
import HomePage from "../pages/home/HomePage";
import BookingPage from "../pages/booking/BookingPage";
import BookingSinglePage from "../pages/booking/[id]";
import Classroom from "../pages/admin/classroom";
import PersonnalCalendar from "../pages/booking/user/[userId]";



const RoutesWrapper = () => {
const [isAdmin, setIsAdmin] = useState(false);
const [user, setUser] = useState<Partial<UserType>>({});

  const checkToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const tokenData = token.split('.')[1];
        const decodedToken = atob(tokenData);
        const parsedToken = JSON.parse(decodedToken);
        if (parsedToken) {
          if (parsedToken.role === "admin") {
            setIsAdmin(true);
            setUser(parsedToken);
          }
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    } else {
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
        <Route path="/booking" element={<BookingPage user={user}/>} />
        <Route path="/booking/:id" element={<BookingSinglePage />} />
        <Route path="/classroom" element={<Classroom isAdmin={isAdmin}/>} />
        <Route path="/booking/user/:userId" element={<PersonnalCalendar />} />

      </Routes>
    </div>
  );
};

export default RoutesWrapper;
