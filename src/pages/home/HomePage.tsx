import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const tokenData = token.split(".")[1];
        const decodedToken = JSON.parse(atob(tokenData));
        if (decodedToken) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse du token:", error);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="flex flex-col p-32 bg-transparent text-black">
      <div className="text-[270px] font-bold leading-none text-left ">
        <h1>BOOKING </h1>
        <h1>CLASSROOM</h1>
      </div>

      <div className="flex place-items-stretch p-20">
        <div className="bg-black bg-opacity-50 p-10 max-w-xl rounded-2xl shadow-xl text-left backdrop-blur-lg">
          <p className="text-white text-2xl mb-5">
            🎉 Bienvenue sur <strong>Booking Class Room</strong> – une
            plateforme pratique pour réserver des salles de classe. 📅 Ici, vous
            pouvez rapidement trouver et réserver des salles disponibles pour
            vos cours 📖✨.
          </p>

          {!isAuthenticated && (
            <div className="space-x-2 flex">
              <Link to="/signup">
                <button className="flex items-center justify-center gap-2 px-7 py-4 bg-white text-black rounded-xl shadow-md hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-black backdrop-blur-lg">
                  <FaUserPlus size={20} />
                  S'inscrire
                </button>
              </Link>
              <Link to="/login">
                <button className="flex items-center justify-center gap-2 px-7 py-4 bg-black bg-opacity-50 text-white rounded-xl shadow-md hover:bg-opacity-70 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300">
                  <FaSignInAlt size={20} />
                  Se connecter
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
