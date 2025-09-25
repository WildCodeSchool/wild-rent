import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

export const cartContext = createContext({
  items: [],
  addItemToCart: (_product: any) => {},
  removeItemFromCart: (_product: any) => {},
  updateQuantity: (_product: any) => {},
});

const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { items: [] };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du panier depuis localStorage:",
      error
    );
    return { items: [] };
  }
};

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ITEM":
      toast.success("Vous avez ajouter un article à votre panier", {
        position: "bottom-right",
      });
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (_: any, i: number) => i !== action.payload.index
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item: any) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }: any) => {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCart
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const handleToAddItem = (product: any, quantity: number = 1) => {
    const productWithTotalPrice = {
      ...product,
      quantity,
    };
    cartDispatch({
      type: "ADD_ITEM",
      payload: productWithTotalPrice,
    });
  };

  const handleRemoveItem = (index: number) => {
    cartDispatch({
      type: "REMOVE_ITEM",
      payload: { index },
    });
  };
  const handleChangeQuantity = (product: any) => {
    cartDispatch({
      type: "UPDATE_QUANTITY",
      payload: product,
    });
  };

  const initialValue = {
    items: cartState.items,
    addItemToCart: handleToAddItem,
    removeItemFromCart: handleRemoveItem,
    updateQuantity: handleChangeQuantity,
  };
  return (
    <cartContext.Provider value={initialValue}>{children}</cartContext.Provider>
  );
};
