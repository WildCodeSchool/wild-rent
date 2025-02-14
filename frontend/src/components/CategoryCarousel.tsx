import { Link } from "react-router-dom";
import { categoryProps } from "./CategoryCard";
import { useGetProductByCategoryQuery } from "../generated/graphql-types";
import Carousel from "./Carousel";

function CategoryCarousel({ title, id }: categoryProps) {
  const { data, loading, error } = useGetProductByCategoryQuery({
    variables: {
      category: id,
    },
  });
  const products = data?.getProductByCategory;

  return (
    <div className="w-full px-20 max-w-[1280px] mb-4">
      <div className="font-bold font-title text-xl mb-4">{title}</div>
      <Carousel>
        {products &&
          products.map((product) => (
            <div className="embla__slide relative flex-none flex aspect-square basis-1/4 p-2 rounded-md overflow-hidden group ">
              <div className="w-full h-full flex flex-col items-center ">
                <img
                  src={product.pictures[0].url}
                  className=" object-contain w-full h-4/5 pb-2 "
                />
                <div className="h-1/5 w-full flex flex-col items-center">
                  <div className="text-green font-bold text-lg">
                    {product.name}
                  </div>
                  <div className="text-gray-500 font-bold text-lg">
                    {product.price} €
                  </div>
                </div>
              </div>
              <div className="absolute transition-all duration-300 ease-in-out bg-black/0 inset-0 z-10 group-hover:bg-black/20 cursor-pointer"></div>
            </div>
          ))}
      </Carousel>
      <div className="w-full flex justify-end">
        <Link
          to={`produits/categorie/${title}`}
          className="hover:decoration-1 text-body font-semibold text-gray-600"
        >
          Voir tous les articles
        </Link>
      </div>
    </div>
  );
}

export default CategoryCarousel;
