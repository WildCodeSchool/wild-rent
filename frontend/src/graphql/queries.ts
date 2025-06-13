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

export const GET_PRODUCTS_BY_FILTERS = gql`
  query GetProductWithFilters($maxPrice: Float!, $minPrice: Float!, $categoryId: Float!, $tags: [String!]!) {
    getProductWithFilters(maxPrice: $maxPrice, minPrice: $minPrice, categoryId: $categoryId, tags: $tags) {
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
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetAllUsers($offset: Float!, $limit: Float!, $role: String, $search: String) {
  getAllUsers(offset: $offset, limit: $limit,  role: $role, search: $search) {
    totalUsersLength
    users {
      address {
        city
        country
        street
        zipcode
      }
      created_at
      email
      first_name
      id
      last_name
      phone_number
      role
    }
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

export const GET_TAGS_BY_CATEGORY = gql`
  query GetTagsByCategory($category: Float!) {
    getTagsByCategory(category: $category) {
      id
      label
    }
}
`;
