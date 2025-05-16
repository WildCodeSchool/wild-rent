import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../generated/graphql-types";
import { useContext, useState } from "react";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cartContext } from "../context/CartContext";

export const calculateDuration = (start: Date | null, end: Date | null) => {
  if (start && end) {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    return 0;
  }
};

const imageBasePath = "/assets/images/";

const ProductDetails = () => {
  const { id }: any = useParams();
  const { addItemToCart } = useContext(cartContext);

  const { loading, error, data } = useGetProductByIdQuery({
    variables: { getProductByIdId: parseInt(id) },
  });

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const products = data?.getProductById;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  const mainImage = activeImage || products?.pictures[0].url;

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
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {products?.product_options?.map((el: any) => (
                  <option key={el.id} value={el.size}>
                    {el.size}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker
            <div className="flex flex-col gap-4 mb-4">
              <label className="block text-sm font-medium">
                Dates de réservation :
              </label>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col w-[45%]">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      calculateDuration(date, endDate);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Début"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex flex-col w-[45%]">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      handleDuration(startDate, date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Fin"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
              </div>
            </div> */}
            <div className="mt-7 text-sm font-medium">
              Niveau: Intermédiaire
            </div>
          </div>
          <div className="flex mt-3 md:flex-col md:mt-0 justify-evenly">
            {/* Pricing and CTA */}
            <div className="mb-0 bg-gray-100 p-3 rounded-lg shadow-sm md:mb-4">
              <div className="text-xl font-bold">{products?.price}€ / jour</div>
              {/* <div className="text-sm text-gray-600">
                Durée: {duration} jour(s)
              </div>
              <div className="text-lg font-semibold">
                Total: {duration * (products?.price || 0)}€
              </div> */}
            </div>

            <button
              onClick={() => {
                // if (!startDate || !endDate || !duration) {
                //   alert(
                //     "Veuillez sélectionner des dates et une durée avant d'ajouter au panier."
                //   );
                //   return;
                // }

                //const totalPrice = duration * (products?.price || 0);
                addItemToCart(products);
              }}
              className="h-15 mt-7 md:w-full bg-[#4F6F64] text-white py-3 rounded-lg font-medium shadow-md hover:bg-[#3e5b51] transition"
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
