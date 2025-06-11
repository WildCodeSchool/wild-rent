import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";
import { UserContextProvider } from "./context/UserContext.tsx";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <CartContextProvider>
        <StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StrictMode>
      </CartContextProvider>
    </UserContextProvider>
  </ApolloProvider>
);
