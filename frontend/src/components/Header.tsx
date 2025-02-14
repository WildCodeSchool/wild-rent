import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className="bg-light-beige flex items-center justify-between px-4 md:px-8 py-3">
        <div className="md:hidden">
          <img
            src="/assets/images/burger-bar.png"
            alt="burger menu"
            className="w-10 h-10 md:w-8 md:h-8"
          />
        </div>

        <Link to={"/"} className="flex items-center gap-x-2 md:flex-1">
          <img
            src="/assets/images/logo.png"
            alt="Wild Rent logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            Wild Rent
          </h1>
        </Link>

        <div className="flex items-center gap-x-4">
          <Link
            className="flex flex-col items-center hover:underline text-green"
            to={"/login"}
          >
            <img
              src="/assets/images/user-icon.png"
              alt="user icon"
              className="w-6 h-6 md:w-8 md:h-8"
            />
            <span className="hidden md:block text-sm text-green">
              Mon compte
            </span>
          </Link>
          <Link
            className="flex flex-col items-center hover:underline text-green"
            to={"/panier"}
          >
            <img
              src="/assets/images/cart.png"
              alt="cart"
              className="w-6 h-6 md:w-8 md:h-8"
            />
            <span className="hidden md:block text-sm text-green">
              Mon panier
            </span>
          </Link>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
