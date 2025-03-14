import { useContext } from "react";
import { cartContext } from "../context/CartContext";

const cart = () => {
  const { items } = useContext(cartContext);
  console.log(items);
  return items.map((item: any, index: number) => (
    <div key={index}>
      <p>Produit: {item.name}</p>
      <p>Prix total: {item.totalPrice}€</p>
      {/*   <p>Début: {item.startDate}</p>
      <p>Fin: {item.endDate}</p> */}
    </div>
  ));
};

export default cart;
