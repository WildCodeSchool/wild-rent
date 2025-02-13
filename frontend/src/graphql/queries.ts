import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllCategories {
    getAllCategories {
      id
      title
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
 query GetAllCategories {
  getAllCategories {
    id
    image
    title
  }
}
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
query GetProductByCategory($category: Float!) {
  getProductByCategory(category: $category) {
    category {
      title
    }
    name
    price
    pictures {
      id
      url
    }
    id
  }
}
`; 
