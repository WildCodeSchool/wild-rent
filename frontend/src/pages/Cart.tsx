import { useContext } from "react";
import { cartContext } from "../context/CartContext";

const cart = () => {
  const { items } = useContext(cartContext);
  console.log(items);
  return (
    <>
      <h3 className="text-center">Contenu de mon panier</h3>
      <div className="bg-white flex justify-center flex-col p-4">
        {items.map((item: any, index: number) => (
          <div
            className="w-3/4 bg-[#52796F] m-auto mt-4 flex justify-between items-center"
            key={index}
          >
            <div className="w-1/4 flex justify-center mt-2 mb-2">
              <img
                className="max-w-full max-h-24"
                src={item.pictures[0].url}
                alt={item.name}
              />
            </div>
            <div className="bg-[#D9D9D9] w-1/2 p-2">
              <p> {item.name}</p>
              <p>{item.product_options}</p>
              <p>
                du {new Date(item.startDate).toLocaleDateString()} au{" "}
                {new Date(item.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col pt-8">
              <div className="flex justify-between items-center">
                <div className="bg-[#D9D9D9] w-14 rounded-tl-lg rounded-bl-lg flex justify-center">
                  <img
                    src="/assets/images/corbeille.png"
                    alt="corbeille"
                    className="w-4 h-4 md:w-6 md:h-6"
                  />{" "}
                </div>
                <div className="bg-[#D9D9D966] w-14 text-center">1</div>
                <div className="bg-[#D9D9D9] w-14 rounded-tr-lg rounded-br-lg text-center">
                  +
                </div>
              </div>
              <div className="text-center mt-2 text-white">
                {" "}
                <p>{item.totalPrice}€</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default cart;
