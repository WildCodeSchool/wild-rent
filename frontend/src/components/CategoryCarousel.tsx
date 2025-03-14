import { Link } from "react-router-dom";
import { categoryProps } from "./CategoryCard";
import { useGetProductByCategoryQuery } from "../generated/graphql-types";
import Carousel from "./Carousel/Carousel";
import ItemCard from "./ItemCard";

function CategoryCarousel({ title, id }: categoryProps) {
  const { data, loading, error } = useGetProductByCategoryQuery({
    variables: {
      category: id,
    },
  });
  const products = data?.getProductByCategory;

  console.log(products);

  return (
    <div className="w-full px-20 max-w-[1280px] mb-4">
      <div className="flex w-full justify-between px-4">
        <div className="font-bold font-title text-xl mb-4">{title}</div>
        <Link
          to={`produits/categorie/${title}`}
          className="text-body font-semibold text-green border-1 text-center self-center px-3 py-2 rounded-md border-gray-200 hover:bg-green/20"
        >
          Voir tous les articles
        </Link>
      </div>
      <Carousel>
        {products && products.map((product) => <ItemCard product={product} />)}
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
