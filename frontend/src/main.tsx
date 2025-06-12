import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllUsers: {
            keyArgs: ["role"],
            merge(
              existing = { users: [], totalUsersLength: 0 },
              incoming,
              { args }
            ) {
              const merged = [...existing.users];
              const start = args?.offset || 0;
              for (let i = 0; i < incoming.users.length; ++i) {
                merged[start + i] = incoming.users[i];
              }

              return {
                ...incoming,
                users: merged,
              };
            },
            read(existing, { args }) {
              if (!existing) return undefined;
              const { offset = 0, limit = 10 } = args || {};
              const slicedUsers = existing.users.slice(offset, offset + limit);
              if (slicedUsers.length < limit) return undefined;
              return {
                totalUsersLength: existing.totalUsersLength,
                users: slicedUsers,
              };
            },
          },
        },
      },
    },
  }),
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
