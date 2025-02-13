import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../generated/graphql-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProductDetails = () => {
  const { id }: any = useParams();
  console.log(id);
  const { loading, error, data } = useGetProductByIdQuery({
    variables: { getProductByIdId: parseInt(id) },
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  if (data) {
    return (
      <>
        <div className="flex flex-row">
          <div>
            <img src={data?.getProductById.pictures[0].url} alt="Chaussure" />
          </div>
          <div>
            <div className="flex flex-row">
              <div>
                <h2>{data?.getProductById.name}</h2>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Start</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Sélectionner une date"
                    className="border rounded-md p-2 text-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">End</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Sélectionner une date"
                    className="border rounded-md p-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <div>{data?.getProductById.price}€ /jour</div>
                <button className="bg-[#4F6F64] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#3e5b51] transition">
                  Ajouter au panier
                </button>
              </div>
            </div>
            <div>
              {" "}
              <div>Taille:</div>
              <div>{data?.getProductById.description}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default ProductDetails;
