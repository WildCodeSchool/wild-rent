import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: UserInput!) {
    register(data: $data)
  }
`;

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data)
  }
`;

export const LOGOUT = gql`
mutation Logout {
  logout
}
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($codeByUser: String!) {
    confirmEmail(code_by_user: $codeByUser)
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($data: ProductInput!) {
    createProduct(data: $data) {
      category {
        title
        id
        image
      }
      created_at
      description
      id
      name
      price
      product_options {
        id
        size
        total_quantity
      }
      pictures {
        id
        url
      }
    }
  }
`;
export const CREATE_ORDER = gql`
  mutation CreateNewOrder($data: OrderInput!) {
    createNewOrder(data: $data) {
      created_at
      total_price
      rental_start_date
      rental_end_date
      status
      user {
        id
      }
      products_in_order {
        productOption {
          product {
            id
          }
          size
          total_quantity
        }
        quantity
      }
    }
  }
`;
