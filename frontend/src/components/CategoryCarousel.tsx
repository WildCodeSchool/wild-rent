import { Link } from "react-router-dom";
import { categoryProps } from "./CategoryCard";
import { useGetProductByCategoryQuery } from "../generated/graphql-types";
import useEmblaCarousel from "embla-carousel-react";

function CategoryCarousel({ title, id }: categoryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const { data, loading, error } = useGetProductByCategoryQuery({
    variables: {
      category: id,
    },
  });
  const products = data?.getProductByCategory;

  return (
    <div className="w-full px-20 max-w-[1024px]">
      <div className="font-bold font-title">{title}</div>
      <div>Il y aura un carousel ici</div>
      <Link
        to={`produits/categorie/${title}`}
        className="hover:decoration-1 text-body text-gray-600"
      >
        Voir tous les articles
      </Link>
    </div>
  );
}

export default CategoryCarousel;
