import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#52796F] flex items-center justify-around">
      <Link to={"/contact"} className="text-white hover:underline m-6">
        Contact
      </Link>
      <Link
        to={"/conditionsdutilisation"}
        className="text-white hover:underline"
      >
        Conditions d'utilisation
      </Link>
      <Link to={"/mentionslegales"} className="text-white hover:underline">
        Mentions légales
      </Link>
    </footer>
  );
};

export default Footer;
