import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaChalkboardTeacher,
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // pour naviger

  // Vérifiez si l'utilisateur est autorisé
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); // Définit l'état si le jeton existe
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Supprime le token
    setIsAuthenticated(false); // Réinitialise l'état d'autorisation
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between p-5 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-6 text-lg font-semibold">
        <Link
          to="/home"
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition duration-200"
        >
          <FaChalkboardTeacher className="text-2xl" />
          <span className="text-xl font-bold">Booking Classroom</span>
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-lg">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              <FaSignInAlt />
              <span>Connexion</span>
            </Link>
            <Link
              to="signup"
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              <FaUserCircle />
              <span>Créer un compte</span>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
