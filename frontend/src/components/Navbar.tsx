import { Link, useLocation } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../generated/graphql-types";
import { normalizeString } from "../assets/utils";
import { SelectRentalDates } from "./SelectRentalDates";

const Navbar = () => {
  const { loading, error, data } = useGetAllCategoriesQuery();

  const location = useLocation();
  const pathname = location.pathname;

  const isCategoryPage = pathname.includes("/products/category");

  if (loading) return <p>Loading ...</p>;
  if (error) return <p> Error : {error.message}</p>;
  if (data) {
    return (
      <div className="flex flex-col items-center w-full">
        <nav className="bg-green flex items-center justify-center sm:justify-between px-6 py-3 w-full">
          {data.getAllCategories.map((category) => (
            <Link
              key={category.id}
              to={`/products/category/${normalizeString(category.title)}`}
              state={{
                id: category.id,
                title: category.title,
                image: category.image,
              }}
              className="text-white font-bold hover:underline hidden sm:flex gap-x-6 text-sm md:text-base"
            >
              {category.title}
            </Link>
          ))}

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="relative w-full max-w-sm sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] ml-4"
          >
            <div className="flex items-center bg-white rounded px-4 py-2 shadow-md">
              <input
                type="text"
                placeholder="Rechercher"
                className="outline-none bg-transparent placeholder-gray-500 text-gray-700 w-full text-base sm:text-sm"
              />
              <button className="cursor-pointer">
                <img
                  src="/assets/images/icons/loupe.png"
                  alt="loupe"
                  className="w-5 h-5 mr-3"
                />
              </button>
            </div>
          </form>
        </nav>
        {!isCategoryPage && <SelectRentalDates />}
      </div>
    );
  }
};

export default Navbar;
