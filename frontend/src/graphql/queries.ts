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
  query GetProductWithFilters(
    $maxPrice: Float!
    $minPrice: Float!
    $categoryId: Float!
    $tags: [String!]!
  ) {
    getProductWithFilters(
      maxPrice: $maxPrice
      minPrice: $minPrice
      categoryId: $categoryId
      tags: $tags
    ) {
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
        total_quantity
      }
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      id
      first_name
      last_name
      email
      phone_number
      role
      created_at
      address {
        street
        city
        zipcode
        country
      }
    }
  }
`;

export const WHO_AM_I = gql`
  query Whoami {
    whoami {
      id
      email
      role
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

export const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    getAllOrders {
      created_at
      total_price
      rental_start_date
      rental_end_date
      status
      user {
        id
      }
      products_in_order {
        quantity
        productOption {
          product {
            id
            name
          }
          size
          id
        }
      }
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query getOrderById($getOrderById: Float!) {
    getOrderById(id: $getOrderById) {
      created_at
      total_price
      rental_start_date
      rental_end_date
      status
      user {
        id
      }
      products_in_order {
        quantity
        productOption {
          product {
            name
            id
          }
          id
          size
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS_BY_OPTIONS = gql`
  query SearchProductsByOptions($options: ProductSearchOptions!) {
    searchProductsByOptions(options: $options) {
      name
      category {
        title
        id
        image
      }
      description
      id
      pictures {
        url
        id
      }
      price
      product_options {
        size
        id
        total_quantity
      }
      tags {
        id
        label
      }
    }
  }
`;
