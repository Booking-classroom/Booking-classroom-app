import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className=" flex flex-col  bg-transparent text-black">
      <div className="text-[280px] font-bold leading-none text-left ">
        <h1>BOOKING CLASS</h1>
        <h1>ROOM</h1>
      </div>

      <div className="flex place-items-end pt-10 ">
        <div className="bg-black bg-opacity-50 p-8 max-w-lm  rounded-2xl shadow-xl text-left">
          <p className="text-white text-2xl mb-5">
            🎉 Bienvenue sur <strong>Booking Class Room</strong> – une
            plateforme pratique pour réserver des salles de classe. 📅 Ici, vous
            pouvez rapidement trouver et réserver des salles disponibles pour
            vos cours 📖✨.
          </p>

          <div className="space-x-2">
            <Link to="/signup">
              <button className="px-7 py-4 bg-white text-black rounded-xl shadow-md hover:bg-gray-300 transition">
                S'inscrire
              </button>
            </Link>
            <Link to="/login">
              <button className="px-7 py-4 bg-black text-white rounded-xl shadow-md hover:bg-gray-600 transition">
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
