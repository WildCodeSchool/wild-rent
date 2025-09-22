import { Link, useLocation } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../generated/graphql-types";
import { normalizeString } from "../assets/utils";
import { SelectRentalDates } from "./SelectRentalDates";

const Navbar = () => {
  const { loading, error, data } = useGetAllCategoriesQuery();

  const location = useLocation();
  const pathname = location.pathname;

  const rentalDatesVisible = pathname === "/" || pathname === "/panier";

  if (loading) return <p>Loading ...</p>;
  if (error) return <p> Error : {error.message}</p>;
  if (data) {
    return (
      <div className="flex flex-col items-center w-full">
        <nav className="bg-green hidden sm:flex items-center justify-center sm:justify-between px-8 py-3 w-full">
          {data.getAllCategories.map((category) => (
            <Link
              key={category.id}
              to={`/produits/categorie/${normalizeString(category.title)}`}
              state={{
                id: category.id,
                title: category.title,
                image: category.image,
              }}
              className="text-white font-bold hover:underline  gap-x-6 text-sm md:text-base"
            >
              {category.title}
            </Link>
          ))}
        </nav>
        {rentalDatesVisible && <SelectRentalDates />}
      </div>
    );
  }
};

export default Navbar;
