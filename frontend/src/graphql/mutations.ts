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

export const MODIFY_PRODUCT = gql`
  mutation ModifyProduct($data: ProductInput!) {
    modifyProductById(data: $data) {
      id
      name
      description
      price
      pictures {
        id
        url
      }
      product_options {
        id
        size
        total_quantity
      }
      created_at
      category {
        id
        title
      }
      tags {
        label
        id
      }
    }
  }
`;

export const DELETE_PRODUCT_BY_ID = gql`
  mutation DeleteProductById($id: Float!) {
    deleteProductById(id: $id)
  }
`;
