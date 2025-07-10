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

export const EDIT_USER = gql`
  mutation EditUser($data: UpdateOrCreateUserInput!) {
    editUser(data: $data) {
      address {
        city
        country
        street
        zipcode
      }
      email
      created_at
      first_name
      id
      last_name
      phone_number
      role
  }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($data: UpdateOrCreateUserInput!) {
    addUser(data: $data)
}
`;

export const ADD_USER_CONFIRMATION = gql`
  mutation AddUserConfirmation($password: String!, $randomCode: String!) {
    addUserConfirmation(password: $password, random_code: $randomCode) {
      email
      first_name
      last_name
      id
      role
      address {
        city
        country
        street
        zipcode
      }
    }
}
`;
