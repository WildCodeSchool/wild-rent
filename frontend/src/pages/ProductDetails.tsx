import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../generated/graphql-types";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
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

const imageBasePath = "/assets/images/"

const ProductDetails = () => {
  const { id }: any = useParams();
  const { addItemToCart } = useContext(cartContext);

  const { loading, error, data } = useGetProductByIdQuery({
    variables: { getProductByIdId: parseInt(id) },
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const products = data?.getProductById;

  const handleDuration = (startDate: Date | null, endDate: Date | null) => {
    const newDuration = calculateDuration(startDate, endDate);
    setDuration(newDuration);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  const mainImage = activeImage || imageBasePath + products?.pictures[0].url;

  return (
    <div className="flex flex-col md:flex-row items-start gap-10 p-10 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      {/* Image Section */}
      <div className="flex flex-col gap-4">
        {/* Image principale */}
        <img
          src={mainImage}
          alt={products?.name}
          className="w-64 h-64 object-cover rounded-lg"
        />
        {/* Miniatures */}
        <div className="flex gap-2">
          {products?.pictures.slice(0, 4).map((pic: any, index: number) => (
            <img
              key={index}
              src={pic.url}
              alt="Preview"
              className={`w-20 h-20 rounded-lg cursor-pointer border ${
                pic.url === mainImage ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setActiveImage(pic.url)}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1">
        <div className="flex flex-row">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{products?.name}</h2>

            {/* Taille Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Taille :</label>
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

            {/* Date Picker */}
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col w-1/2">
                <label className="text-sm font-medium mb-1">
                  Période de location :
                </label>
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
              <div className="flex flex-col w-1/2">
                <label className="text-sm font-medium mb-1 invisible">
                  End
                </label>
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
          </div>
          <div>
            {/* Pricing and CTA */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
              <div className="text-xl font-bold">{products?.price}€ / jour</div>
              <div className="text-sm text-gray-600">
                Durée: {duration} jour(s)
              </div>
              <div className="text-lg font-semibold">
                Total: {duration * (products?.price || 0)}€
              </div>
            </div>

            <button
              onClick={() => {
                if (!startDate || !endDate || !duration) {
                  alert(
                    "Veuillez sélectionner des dates et une durée avant d'ajouter au panier."
                  );
                  return;
                }

                const totalPrice = duration * (products?.price || 0);
                addItemToCart(products, totalPrice, startDate, endDate);
              }}
              className="w-full bg-[#4F6F64] text-white py-3 rounded-lg font-medium shadow-md hover:bg-[#3e5b51] transition"
            >
              Ajouter au panier
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700">{products?.description}</p>

        <div className="mt-4 text-sm font-medium">Niveau: Intermédiaire</div>
      </div>
    </div>
  );
};

export default ProductDetails;
