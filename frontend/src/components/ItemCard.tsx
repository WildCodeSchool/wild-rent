import { Link } from "react-router-dom";
import { GetProductByCategoryQuery } from "../generated/graphql-types";

type ProductType = GetProductByCategoryQuery["getProductByCategory"][0];

const ItemCard = ({ product }: { product: ProductType }) => {
  return (
    <div
      className="embla__slide flex-none flex basis-1/4 pl-4 p-2"
      key={product.id}
    >
      <Link to={`/produit/${product.id}`}>
        <div className=" relative aspect-square rounded-md group shadow-sm overflow-hidden">
          <div className="w-full h-full flex flex-col items-center ">
            <img
              src={product.pictures[0].url}
              className=" object-contain w-full h-3/4 py-2 "
            />
            <div className="h-1/4 w-full flex flex-col items-center">
              <div className="text-green font-bold text-lg">{product.name}</div>
              <div className="text-gray-500 font-bold text-lg">
                {product.price} €
              </div>
            </div>
          </div>
          <div className="absolute transition-all duration-300 ease-in-out bg-black/0 inset-0 z-10 group-hover:bg-black/20 cursor-pointer"></div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
