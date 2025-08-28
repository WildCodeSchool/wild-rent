import { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/CartContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateNewOrderMutation } from "../generated/graphql-types";
import { useUser } from "@/hooks/useUser";

const Cart = () => {
  const [createOrderMutation] = useCreateNewOrderMutation();
  const { user } = useUser();
  const { items, removeItemFromCart, updateQuantity } = useContext(cartContext);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [datesValidated, setDatesValidated] = useState(false);

  const total = items
    .map((item: any) => item.price * item.quantity * duration)
    .reduce((acc, price) => acc + price, 0);

  const handleRemoveClick = (index: number) => {
    removeItemFromCart(index);
  };
  const handleAddQuantity = (product: any) => {
    updateQuantity(product.quantity++);
  };
  const handleRemoveQuantity = (product: any) => {
    updateQuantity(product.quantity--);
  };
  const calculateDuration = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  };
  const handleDuration = (startDate: Date | null, endDate: Date | null) => {
    const newDuration: any = calculateDuration(startDate, endDate);
    setDuration(newDuration);
    setDatesValidated(true);

    if (startDate && endDate && newDuration !== undefined) {
      localStorage.setItem("rentalStartDate", startDate.toISOString());
      localStorage.setItem("rentalEndDate", endDate.toISOString());
      localStorage.setItem("rentalDuration", String(newDuration));
    }
  };

  useEffect(() => {
    const savedStart = localStorage.getItem("rentalStartDate");
    const savedEnd = localStorage.getItem("rentalEndDate");
    const savedDuration = localStorage.getItem("rentalDuration");

    if (savedStart && savedEnd && savedDuration) {
      setStartDate(new Date(savedStart));
      setEndDate(new Date(savedEnd));
      setDuration(parseInt(savedDuration));
      setDatesValidated(true);
    }
  }, []);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const createOrder = () => {
    createOrderMutation({
      variables: {
        data: {
          rental_start_date: localStorage.getItem("rentalStartDate"),
          rental_end_date: localStorage.getItem("rentalEndDate"),
          created_at: new Date(),
          total_price: total,
          products: items.map((item: any) => ({
            quantity: item.quantity,
            productOptionId: item.selectedOption.id,
          })),
          userId: user?.id ?? 0,
        },
      },
    });
    console.log("Création de la commande...");
  };

  const handleSubmit = () => {
    createOrder();
    localStorage.removeItem("cart");
    localStorage.removeItem("rentalStartDate");
    localStorage.removeItem("rentalEndDate");
    localStorage.removeItem("rentalDuration");
    window.location.reload();
  };

  return (
    <>
      {items.length === 0 && (
        <p className="text-center text-2xl mt-16 mb-16">
          Votre panier est vide
        </p>
      )}
      {items.length !== 0 && (
        <div>
          <div className="w-[90%] lg:w-[70%] m-auto">
            <div>
              <h3 className="text-xl sm:text-1xl pt-6 font-semibold">
                Vos dates de location :
              </h3>
              <div className="flex flex-col mt-4 mb-4">
                <div className="flex flex-row items-center">
                  <DatePicker
                    placeholderText="Choisir une date"
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    selectsRange
                    className="border rounded-xl p-2 w-full"
                  />
                  <button
                    className="text-sm lg:text-base bg-green text-white p-2 lg:pr-5 lg:pl-5 ml-5 lg:ml-15 rounded-xl"
                    onClick={() => handleDuration(startDate, endDate)}
                  >
                    Valider les date
                  </button>
                </div>
              </div>
              {datesValidated ? (
                <p className="italic">
                  Vous souhaitez louer du {""}
                  <span className="font-bold">
                    {startDate ? startDate.toLocaleDateString() : "?"}
                  </span>{" "}
                  au {""}
                  <span className="font-bold">
                    {endDate ? endDate.toLocaleDateString() : "?"}
                  </span>{" "}
                  soit un total de <span className="font-bold">{duration}</span>{" "}
                  jour(s)
                </p>
              ) : (
                <></>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl pt-6 font-semibold">
              Contenu de mon panier:
            </h3>
          </div>
          <div className="bg-white flex justify-center flex-col md:p-4 ">
            {items.map((item: any, index: number) => (
              <div
                className="w-[95%] lg:w-[80%] bg-green rounded-lg m-auto mt-4 flex justify-between items-center"
                key={index}
              >
                <div className="w-[20%] md:w-[25%] flex justify-center mt-2 mb-2">
                  <img
                    className="max-w-full max-h-14 md:max-h-16 lg:max-h-24 rounded-lg ml-1"
                    src={item.pictures[0].url}
                    alt={item.name}
                  />
                </div>
                <div className="bg-[#D9D9D9] w-[40%] lg:w-[50%] p-1 rounded-lg">
                  <p className="text-base sm:text-xl">
                    {" "}
                    {item.name} - {item.selectedOption.size}
                  </p>

                  <p className="text-xs sm:text-base">{item.price}€ / jour</p>
                </div>
                <div className="w-[30%] flex flex-col items-center">
                  <div className="flex flex-row mt-4">
                    <div>
                      <div className="flex flex-row">
                        <button
                          className="bg-[#D9D9D9] w-6 h-6 md:w-8 lg:w-10 xl:w-14 rounded-tl-lg rounded-bl-lg text-center"
                          onClick={() => handleRemoveQuantity(item)}
                        >
                          -
                        </button>
                        <div className="bg-[#D9D9D966] w-6 md:w-8 lg:w-10 xl:w-14 text-center">
                          {item.quantity}
                        </div>
                        <button
                          className="bg-[#D9D9D9] w-6 md:w-8 lg:w-10 xl:w-14 rounded-tr-lg rounded-br-lg text-center"
                          onClick={() => handleAddQuantity(item)}
                        >
                          +
                        </button>
                      </div>
                      <div className="text-center mt-2 text-white">
                        {duration === 0 ? (
                          <p>{item.price * item.quantity}€</p>
                        ) : (
                          <p>{item.price * item.quantity * duration}€</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-1 ml-2 md:ml-3  lg:mb-4 lg:ml-5">
                      <button onClick={() => handleRemoveClick(index)}>
                        <img
                          src="/assets/images/corbeille.png"
                          alt="corbeille"
                          className="w-4 h-4  lg:w-6 lg:h-6  m-auto"
                        />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 m-auto mt-4 flex justify-between items-center mb-4">
            <p className="text-2xl">Total: </p>
            <p className="text-2xl">{total}€</p>
          </div>
          <div className="flex justify-center pb-8 pt-8">
            <button
              onClick={() => handleSubmit()}
              className="md:w-1/4 m-auto bg-green text-white p-2 rounded-xl sm:text-xl"
            >
              Valider ma commande
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
