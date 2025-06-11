import { createContext } from "react";

export const userContext = createContext({});

export const UserContextProvider = ({ children }: any) => {
  return <userContext.Provider value={{}}>{children}</userContext.Provider>;
};
