import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex">
      <nav
        className={`${
          isOpen ? "sm:w-60" : "w-36"
        }  min-h-screen bg-light-beige p-4 flex flex-col transition-all duration-400 shadow-md z-50`}
      >
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <div className="md:px-4 gap-2 flex text-nowrap items-center gap-x-2">
              <img
                src="/assets/images/icons/logo.png"
                alt="Wild Rent logo"
                className="w-10 h-10"
              />
              {isOpen && (
                <h1 className="text-xl hidden sm:flex font-semibold text-gray-800">
                  Wild Rent
                </h1>
              )}
            </div>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="text-light-beige hover:text-green hover:bg-light-beige rounded-full bg-green cursor-pointer hover:border-1 border-1 border-green hidden sm:flex"
            >
              {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          </div>

          <div className="flex flex-col gap-4 text-gray-700">
            <Link
              to="/admin"
              className="gap-2 flex flex-row text-nowrap md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
            >
              🏠 {isOpen && <p className="hidden sm:flex">Accueil</p>}
            </Link>

            <Link
              to="/admin/utilisateurs"
              className="gap-2 flex text-nowrap md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
            >
              👥 {isOpen && <p className="hidden sm:flex">Utilisateurs</p>}
            </Link>

            <Link
              to="/admin/categorie"
              className=" gap-2 flex text-nowrap md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
            >
              📂 {isOpen && <p className="hidden sm:flex">Catégories</p>}
            </Link>

            <Link
              to="/admin/article"
              className="gap-2 flex text-nowrap md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
            >
              📝 {isOpen && <p className="hidden sm:flex">Articles</p>}
            </Link>

            <Link
              to="/admin/commandes"
              className="gap-2 flex text-nowrap md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
            >
              📦 {isOpen && <p className="hidden sm:flex">Commandes</p>}
            </Link>

            <Link
              to="/admin/inventaire"
              className="gap-2 flex text-nowrap md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
            >
              📊 {isOpen && <p className="hidden sm:flex">Inventaire</p>}
            </Link>

            <Link
              to="/admin/monCompte"
              className="gap-2 flex text-nowrap md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
            >
              👤 {isOpen && <p className="hidden sm:flex">Mon compte</p>}
            </Link>

            <Link
              to="/admin/deconnexion"
              className="gap-2 flex text-nowrap md:text-xl md:px-4 md:py-2 md:rounded-md md:transition-all md:duration-300 md:border md:border-transparent md:hover:border-gray-500 md:hover:bg-gray-50"
            >
              🚪 {isOpen && <p className="hidden sm:flex">Déconnexion</p>}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
