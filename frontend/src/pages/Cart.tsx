import { useContext } from "react";
import { cartContext } from "../context/CartContext";

const cart = () => {
  const { items } = useContext(cartContext);
  console.log(items);
  return items.map((item: any, index: number) => (
    <div key={index}>
      <p>Produit: {item.name}</p>
      <p>Prix total: {item.totalPrice}€</p>
      <p>
        Début:{" "}
        {item.startDate
          ? new Date(item.startDate).toLocaleDateString()
          : "Non défini"}
      </p>
      <p>
        Fin:{" "}
        {item.endDate
          ? new Date(item.endDate).toLocaleDateString()
          : "Non défini"}
      </p>
    </div>
  ));
};

export default cart;
