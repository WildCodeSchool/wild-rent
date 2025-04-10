import { useContext } from "react";
import { cartContext } from "../context/CartContext";

const cart = () => {
  const { items, removeItemFromCart, updateQuantity } = useContext(cartContext);
  const imageBasePath = "/assets/images/";
  const total = items
    .map((item: any) => item.totalPrice * item.quantity)
    .reduce((acc, price) => acc + price, 0);

  const handleRemoveClick = (index: number) => {
    removeItemFromCart(index);
  };
  const handleUpdateQuantity = (product: any) => {
    updateQuantity(product.quantity++);
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
          <div className="w-3/4 m-auto">
            <h3 className="text-2xl pt-6">Contenu de mon panier:</h3>
          </div>
          <div className="bg-white flex justify-center flex-col p-4">
            {items.map((item: any, index: number) => (
              <div
                className="w-3/4 bg-[#52796F] m-auto mt-4 flex justify-between items-center"
                key={index}
              >
                <div className="w-1/4 flex justify-center mt-2 mb-2">
                  <img
                    className="max-w-full max-h-24"
                    src={imageBasePath + item.pictures[0].url}
                    alt={item.name}
                  />
                </div>
                <div className="bg-[#D9D9D9] w-2/4 p-2">
                  <p> {item.name}</p>
                  <p>{item.product_options}</p>
                  <p>
                    du {new Date(item.startDate).toLocaleDateString()} au{" "}
                    {new Date(item.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-1/4 flex flex-col pt-8 items-center">
                  <div className="flex items-center">
                    <button
                      className="bg-[#D9D9D9] w-14 rounded-tl-lg rounded-bl-lg flex justify-center"
                      onClick={() => handleRemoveClick(index)}
                    >
                      <img
                        src="/assets/images/corbeille.png"
                        alt="corbeille"
                        className="w-4 h-4 md:w-6 md:h-6"
                      />{" "}
                    </button>
                    <div className="bg-[#D9D9D966] w-14 text-center">
                      {item.quantity}
                    </div>
                    <button
                      className="bg-[#D9D9D9] w-14 rounded-tr-lg rounded-br-lg text-center"
                      onClick={() => handleUpdateQuantity(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-center mt-2 text-white">
                    {" "}
                    <p>{item.totalPrice * item.quantity}€</p>
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
            <button className="w-1/4 m-auto bg-[#52796F] text-white p-2 rounded-full text-xl">
              Passer ma commande
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default cart;
