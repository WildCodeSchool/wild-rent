import { Link } from "react-router-dom";
import { categoryProps } from "./CategoryCard";
import { useGetProductByCategoryQuery } from "../generated/graphql-types";
import Carousel from "./Carousel";
import ItemCard from "./ItemCard";
import { normalizeString } from "../assets/utils";

function CategoryCarousel({ title, id, image }: categoryProps) {
  const { data, loading, error } = useGetProductByCategoryQuery({
    variables: {
      category: id,
    },
  });
  const products = data?.getProductByCategory;

  if (error) <p>error</p>;
  if (loading) <p>loading</p>;
  return (
    <div className="w-full px-20 max-w-[1280px] mb-4">
      <div className="flex w-full justify-between px-4">
        <div className="font-bold font-title text-xl mb-4">{title}</div>
        <Link
          to={`/products/category/${normalizeString(title)}`}
          className="text-body font-semibold text-green border-1 text-center self-center px-3 py-2 rounded-md border-gray-200 hover:bg-green/20"
          state={{
            id: id,
            title: title,
            image: image,
          }}
        >
          Voir tous les articles
        </Link>
      </div>
      <Carousel>
        {products && products.map((product) => <ItemCard key={product.id} product={product} />)}
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
