import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($getProductByIdId: Float!) {
    getProductById(id: $getProductByIdId) {
      id
      name
      description
      price
      created_at
      # category {
      #   id
      #   title
      # }
      pictures {
        id
        url
      }
      # product_options {
      #   size
      #   id
      #   available_quantity
      # }
    }
  }
`;
