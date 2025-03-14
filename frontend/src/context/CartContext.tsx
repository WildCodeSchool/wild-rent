import { createContext, useEffect, useReducer } from "react";

export const cartContext = createContext({
  items: [],
  addItemToCart: (
    product: any,
    startDate: any,
    endDate: any,
    totalPrice: number
  ) => {},
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
      return {
        ...state,
        items: [...state.items, action.payload],
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

  const handleToAddItem = (
    product: any,
    startDate: any,
    endDate: any,
    totalPrice: number
  ) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: product,
      startDate,
      endDate,
      totalPrice,
    });
  };
  const initialValue = {
    items: cartState.items,
    addItemToCart: handleToAddItem,
  };
  console.log(cartState.items);
  return (
    <cartContext.Provider value={initialValue}>{children}</cartContext.Provider>
  );
};
