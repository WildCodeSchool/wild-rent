import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <nav
        className={`${
          isOpen ? "w-60" : "w-28"
        } h-screen bg-light-beige p-4 flex flex-col transition-all duration-400 shadow-md`}
      >
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-x-2">
              <img
                src="/assets/images/icons/logo.png"
                alt="Wild Rent logo"
                className="w-10 h-10"
              />
              {isOpen && (
                <h1 className="text-xl font-semibold text-gray-800">
                  Wild Rent
                </h1>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-beige hover:text-green hover:bg-light-beige rounded-full bg-green cursor-pointer hover:border-1 border-1 border-green"
            >
              {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          </div>

          <div className="flex flex-col gap-4 text-gray-700">
            {isOpen ? (
              <Link
                to="/admin"
                className="md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
              >
                🏠 Accueil
              </Link>
            ) : (
              <Link
                to="/admin"
                className="flex justify-center items-center p-2 rounded-md bg-white hover:bg-blue-100 text-xl"
              >
                🏠
              </Link>
            )}

            {isOpen ? (
              <Link
                to="/admin/categorie"
                className="md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
              >
                📂 Catégorie
              </Link>
            ) : (
              <Link
                to="/admin/categorie"
                className="flex justify-center items-center p-2 rounded-md bg-white hover:bg-blue-100 text-xl"
              >
                📂
              </Link>
            )}

            {isOpen ? (
              <Link
                to="/admin/article"
                className="md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
              >
                📝 Article
              </Link>
            ) : (
              <Link
                to="/admin/article"
                className="flex justify-center items-center p-2 rounded-md bg-white hover:bg-blue-100 text-xl"
              >
                📝
              </Link>
            )}

            {isOpen ? (
              <Link
                to="/admin/commandes"
                className="md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
              >
                📦 Commandes
              </Link>
            ) : (
              <Link
                to="/admin/commandes"
                className="flex justify-center items-center p-2 rounded-md bg-white hover:bg-blue-100 text-xl"
              >
                📦
              </Link>
            )}

            {isOpen ? (
              <Link
                to="/admin/inventaire"
                className="md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
              >
                📊 Inventaire
              </Link>
            ) : (
              <Link
                to="/admin/inventaire"
                className="flex justify-center items-center p-2 rounded-md bg-white hover:bg-blue-100 text-xl"
              >
                📊
              </Link>
            )}

            {isOpen ? (
              <Link
                to="/admin/monCompte"
                className="md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
              >
                👤 Mon compte
              </Link>
            ) : (
              <Link
                to="/admin/monCompte"
                className="flex justify-center items-center p-2 rounded-md bg-white hover:bg-blue-100 text-xl"
              >
                👤
              </Link>
            )}

            {isOpen ? (
              <Link
                to="/admin/deconnexion"
                className="md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
              >
                🚪 Déconnexion
              </Link>
            ) : (
              <Link
                to="/admin/deconnexion"
                className="flex justify-center items-center p-2 rounded-md bg-white hover:bg-blue-100 text-xl"
              >
                🚪
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
