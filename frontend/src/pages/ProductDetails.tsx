import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../generated/graphql-types";
import { useContext, useState } from "react";
import { cartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id }: any = useParams();
  const { addItemToCart } = useContext(cartContext);

  const { loading, error, data } = useGetProductByIdQuery({
    variables: { getProductByIdId: parseInt(id) },
  });

  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    size: string;
    total_quantity: number;
  } | null>(null);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const products = data?.getProductById;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  const mainImage = activeImage || products?.pictures[0].url;
  console.log(selectedOption);
  return (
    <div className="flex flex-col md:flex-row items-start gap-10 p-10 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      {/* Image Section */}
      <div className="flex flex-row md:flex-col gap-4 m-auto">
        {/* Image principale */}
        <img
          src={mainImage}
          alt={products?.name}
          className="w-64 h-64 object-cover rounded-lg"
        />
        {/* Miniatures */}
        <div className="flex flex-col md:flex-row gap-2 justify-around">
          {products?.pictures.slice(0, 4).map((pic: any, index: number) => {
            const fullUrl = pic.url;
            return (
              <img
                key={index}
                src={fullUrl}
                alt="Preview"
                className={`w-20 h-20 rounded-lg cursor-pointer border ${
                  fullUrl === mainImage
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setActiveImage(fullUrl)}
              />
            );
          })}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 m-auto">
        <h2 className="text-2xl font-semibold mb-2 ">{products?.name}</h2>
        {/* Description */}
        <p className="mt-4 mb-4 text-gray-700">{products?.description}</p>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="w-full md:w-1/2">
            {/* Taille Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-4 mt-5">
                Taille :
              </label>
              <select
                className="border rounded-md p-2 w-full"
                value={selectedOption ? JSON.stringify(selectedOption) : ""}
                onChange={(e) => {
                  const parsed = JSON.parse(e.target.value);
                  setSelectedOption(parsed);
                }}
              >
                <option value="" disabled>
                  -- Sélectionnez une taille --
                </option>
                {products?.product_options?.map((el: any) => (
                  <option
                    key={el.id}
                    value={JSON.stringify({
                      id: el.id,
                      size: el.size,
                      total_quantity: el.total_quantity,
                    })}
                  >
                    {el.size}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-7 text-sm font-medium">
              Niveau: Intermédiaire
            </div>
          </div>
          <div className="flex mt-3 md:flex-col justify-evenly  ">
            {/* Pricing and CTA */}
            <div className=" bg-gray-100 p-3 rounded-lg shadow-sm">
              <div className="text-xl font-bold">{products?.price}€ / jour</div>
            </div>

            <button
              onClick={() => {
                const productWithOptions = {
                  ...products,
                  selectedOption,
                };
                addItemToCart(productWithOptions);
              }}
              className="h-15 md:mt-7 md:w-full bg-[#4F6F64] text-white py-3 rounded-lg font-medium shadow-md hover:bg-[#3e5b51] transition"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
