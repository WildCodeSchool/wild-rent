import { gql } from "@apollo/client";

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

export const GET_PRODUCT_OPTIONS_BY_ID_PRODUCT = gql`
  query GetProductOptions($productId: Float!) {
    getProductOptions(productId: $productId) {
      id
      size
      total_quantity
      available_quantity
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
      product_options {
        size
        id
        available_quantity
      }
}
`; 
export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      email
      isLoggedIn
    }
  }
`;
