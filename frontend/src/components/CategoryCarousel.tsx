import { Link } from "react-router-dom";
import { categoryProps } from "./CategoryCard";
import { useGetProductByCategoryQuery } from "../generated/graphql-types";
import useEmblaCarousel from "embla-carousel-react";
import Carousel from "./Carousel";

function CategoryCarousel({ title, id }: categoryProps) {
  const { data, loading, error } = useGetProductByCategoryQuery({
    variables: {
      category: id,
    },
  });
  const products = data?.getProductByCategory;

  return (
    <div className="w-full px-20 max-w-[1024px] mb-4">
      <div className="font-bold font-title mb-2">{title}</div>
      <Carousel>
        {["ski", "bottes", "snowboard", "masque", "batons", "mouffles"].map(
          (product) => (
            <div className="embla__slide flex-none flex h-36 basis-1/5 p-2">
              <div className="w-full h-full border-2 border-green text-center">
                {product}
              </div>
            </div>
          )
        )}
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
