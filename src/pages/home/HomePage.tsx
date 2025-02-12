import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className=" flex flex-col  bg-transparent text-white">
      <div className="text-[280px] font-bold leading-none text-left ">
        <h1>BOOKING CLASS</h1>
        <h1>ROOM</h1>
      </div>

      <div className="flex justify-center place-items-end ">
        <div className="bg-black bg-opacity-50 p-8 max-w-lm rounded-2xl shadow-xl text-right">
          <p className="text-white mb-5">
            Bienvenue sur Booking Class Room – une plateforme pratique pour
            réserver des salles de classe. Ici, vous pouvez rapidement trouver
            et réserver des salles disponibles pour vos cours.
          </p>
          <div className="space-x-2">
            <Link to="/signup">
              <button className="px-6 py-3 bg-white text-black rounded-xl shadow-md hover:bg-gray-300 transition">
                S'inscrire
              </button>
            </Link>
            <Link to="/login">
              <button className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-600 transition">
                Se connecter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
