import { createContext, useReducer } from "react";

export const basketContext = createContext({
  items: [],
  addItemToBasket: (products: any) => {},
});

const basketReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ITEM":
      console.log(state);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export const BasketContextProvider = ({ children }: any) => {
  const [basketState, basketDispatch] = useReducer(basketReducer, {
    items: [],
  });
  const handleToAddItem = (product: any) => {
    basketDispatch({
      type: "ADD_ITEM",
      payload: { products: product },
    });
  };
  const initialValue = {
    items: basketState.items,
    addItemToBasket: handleToAddItem,
  };
  return (
    <basketContext.Provider value={initialValue}>
      {children}
    </basketContext.Provider>
  );
};
