import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../generated/graphql-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCart } from "react-use-cart";

const ProductDetails = () => {
  const { id }: any = useParams();
  const { addItem } = useCart();

  const { loading, error, data } = useGetProductByIdQuery({
    variables: { getProductByIdId: parseInt(id) },
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const products = data?.getProductById;

  const calculateDuration = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays);
    } else {
      setDuration(0);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  if (data) {
    return (
      <div className="flex flex-row">
        <div>
          <img src={products?.pictures[0].url} alt="Chaussure" />
        </div>
        <div>
          <div className="flex flex-row">
            <div>
              <h2>{products?.name}</h2>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Start</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    calculateDuration(date, endDate);
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Sélectionner une date"
                  className="border rounded-md p-2 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">End</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    calculateDuration(startDate, date);
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Sélectionner une date"
                  className="border rounded-md p-2 text-sm"
                />
              </div>
            </div>
            <div>
              <div>{products?.price}€ /jour</div>
              <div>Durée: {duration} jour(s)</div>
              <div>Total: {duration * (products?.price || 0)}€</div>
              <button
                onClick={() => {
                  addItem({
                    id: products!.id.toString(),
                    name: products!.name,
                    price: products!.price,
                    duration: duration,
                    totalPrice: duration * (products?.price || 0),
                    size: selectedSize,
                  });
                  console.log("Produit ajouté au panier:", {
                    id: products!.id,
                    name: products!.name,
                    price: products!.price,
                    duration: duration,
                    totalPrice: duration * (products?.price || 0),
                    size: selectedSize,
                  });
                }}
                className="bg-[#4F6F64] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#3e5b51] transition"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
          <div>
            <label>
              <br />
              Taille :
              <br />
              <select
                className="text-field"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {products?.product_options?.map((el: any) => (
                  <option key={el.id} value={el.size}>
                    {el.size}
                  </option>
                ))}
              </select>
            </label>
            <div>{products?.description}</div>
          </div>
        </div>
      </div>
    );
  }
};
export default ProductDetails;
