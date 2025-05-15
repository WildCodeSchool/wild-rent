import { useLocation } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../generated/graphql-types";
import Loader from "../components/Loader";
import ItemCard from "../components/ItemCard";

function ProductsByCategories() {
  const location = useLocation();
  const { id, title, image } = location.state;
  const { data, loading, error } = useGetProductByCategoryQuery({
    variables: {
      category: id,
    },
  });
  const products = data?.getProductByCategory;

  if (loading) return <Loader />;
  if (error) console.error(error);
  return (
    <div>
      <div className="w-screen  aspect-video md:aspect-[7/2] relative overflow-hidden flex flex-col justify-center items-center mb-5">
        <img
          src={`/assets/images/categories/${image}`}
          className="object-cover w-full object-center"
        />
        <div className="absolute bottom-0 h-3/4 w-full bg-gradient-to-b from-transparent to-black/70 z-10"></div>
        <h1 className="absolute text-body font-semibold text-4xl lg:text-5xl xl:text-7xl text-white z-20">
          {title}
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row w-full px-5 lg:px-10 xl:px-20">
        <div className="w-1/4">Filters section</div>
        <div className="grid gris-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-3/4">
          {products &&
            products.map((product) => (
              <div className="aspect-square">
                <ItemCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsByCategories;
