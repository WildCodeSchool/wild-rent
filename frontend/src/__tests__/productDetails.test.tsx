import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import ProductDetails from "../pages/ProductDetails";
import { GET_PRODUCT_BY_ID } from "../graphql/queries";
import "@testing-library/jest-dom";

const { id }: any = "1";
const mocks = [
  {
    request: {
      query: GET_PRODUCT_BY_ID,
      variables: { getProductByIdId: parseInt(id) },
    },
    result: {
      data: {
        getProductById: {
          id: 1,
          name: "Produit Test",
          description: "Description",
          price: 100,
          pictures: [{ id: 1, url: "https://via.placeholder.com/150" }],
          created_at: "2023-01-01",
          product_options: [],
        },
      },
    },
  },
];

test("affiche le nom du produit", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProductDetails />
    </MockedProvider>
  );

  expect(await screen.findByText("Produit Test")).toBeInTheDocument();
});
