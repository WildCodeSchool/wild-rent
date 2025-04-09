import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../generated/graphql-types";
import { normalizeString } from "../assets/utils";

const Navbar = () => {
  const { loading, error, data } = useGetAllCategoriesQuery();

  if (loading) return <p>Loading ...</p>;
  if (error) return <p> Error : {error.message}</p>;
  if (data) {
    return (
      <nav className="bg-green flex items-center justify-center sm:justify-between px-6 py-3">
        {data.getAllCategories.map((category) => (
          <Link
            key={category.id}
            to={`/products/category/${normalizeString(category.title)}`}
            className="text-white font-bold hover:underline hidden sm:flex gap-x-6"
          >
            {category.title}
          </Link>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="relative w-full max-w-xs sm:max-w-sm"
        >
          <div className="flex items-center bg-white rounded px-4 py-2 shadow-md">
            <input
              type="text"
              placeholder="Rechercher"
              className="outline-none bg-transparent placeholder-gray-500 text-gray-700 w-full"
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
    );
  }
};

export default Navbar;
