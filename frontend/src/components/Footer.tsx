import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green flex items-center justify-around mt-10">
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
