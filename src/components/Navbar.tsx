import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaChalkboardTeacher,
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const tokenData = token.split(".")[1];
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

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between p-5 shadow-md">
      <div className="flex items-center space-x-6 text-lg font-semibold">
        <Link
          to="/"
          className="flex items-center space-x-2 text-black hover:text-gray-500 transition duration-200"
        >
          <FaChalkboardTeacher className="text-2xl" />
          <span className="text-xl font-bold">Booking Classroom</span>
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-lg">
        {isAdmin && (
          <>
          <Link
            to="/classroom"
            className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md"
          >
            <span>Classroom</span>
          </Link>
          <Link
            to="/material"
            className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md"
          >
            <span>Material</span>
          </Link>
          </>
        )}
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md"
            >
              <FaSignInAlt />
              <span>Connexion</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md"
            >
              <FaUserCircle />
              <span>Créer un compte</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/booking"
              className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md"
            >
              <FaRegCalendarAlt className="w-5 h-5" />
              <span>Calendrier</span>
            </Link>
            <Link
              to="/booking/material"
              className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md"
            >
              <span>Materiel</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md"
            >
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
