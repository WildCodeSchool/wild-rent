import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllCategories {
    getAllCategories {
      id
      title
    }
  }
`;
