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

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: Float!) {
    deleteUser(id: $deleteUserId)
  }
`;
