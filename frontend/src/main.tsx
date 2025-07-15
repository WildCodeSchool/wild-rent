import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache({ addTypename: false }),
  credentials: "same-origin",
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <CartContextProvider>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </CartContextProvider>
  </ApolloProvider>
);
