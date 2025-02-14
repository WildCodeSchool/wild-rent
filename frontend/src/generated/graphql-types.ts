import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  street: Scalars['String']['output'];
  zipcode: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Order = {
  __typename?: 'Order';
  created_at: Scalars['DateTimeISO']['output'];
  products_in_order: Array<ProductInOrder>;
  rental_end_date: Scalars['DateTimeISO']['output'];
  rental_start_date: Scalars['DateTimeISO']['output'];
  status: Scalars['String']['output'];
  total_price: Scalars['Float']['output'];
  user: User;
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  created_at: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  pictures: Array<Picture>;
  price: Scalars['Float']['output'];
  product_options: Array<ProductOption>;
};

export type ProductInOrder = {
  __typename?: 'ProductInOrder';
  order: Order;
  quantity: Scalars['Float']['output'];
  total_price: Scalars['Float']['output'];
};

export type ProductOption = {
  __typename?: 'ProductOption';
  available_quantity: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  product: Product;
  size: Scalars['String']['output'];
  total_quantity: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getProductById: Product;
  getProductOptions: Array<ProductOption>;
};


export type QueryGetProductByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetProductOptionsArgs = {
  productId: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  address: Address;
  created_at: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  hashed_password: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  last_name: Scalars['String']['output'];
  orders: Array<Order>;
  phone_number: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: number }> };

export type GetProductOptionsQueryVariables = Exact<{
  productId: Scalars['Float']['input'];
}>;


export type GetProductOptionsQuery = { __typename?: 'Query', getProductOptions: Array<{ __typename?: 'ProductOption', id: number, size: string, total_quantity: number, available_quantity: number }> };

export type GetProductByIdQueryVariables = Exact<{
  getProductByIdId: Scalars['Float']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById: { __typename?: 'Product', id: number, name: string, description: string, price: number, created_at: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, product_options: Array<{ __typename?: 'ProductOption', size: string, id: number, available_quantity: number }> } };


export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    id
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetProductOptionsDocument = gql`
    query GetProductOptions($productId: Float!) {
  getProductOptions(productId: $productId) {
    id
    size
    total_quantity
    available_quantity
  }
}
    `;

/**
 * __useGetProductOptionsQuery__
 *
 * To run a query within a React component, call `useGetProductOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductOptionsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductOptionsQuery(baseOptions: Apollo.QueryHookOptions<GetProductOptionsQuery, GetProductOptionsQueryVariables> & ({ variables: GetProductOptionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductOptionsQuery, GetProductOptionsQueryVariables>(GetProductOptionsDocument, options);
      }
export function useGetProductOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductOptionsQuery, GetProductOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductOptionsQuery, GetProductOptionsQueryVariables>(GetProductOptionsDocument, options);
        }
export function useGetProductOptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductOptionsQuery, GetProductOptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductOptionsQuery, GetProductOptionsQueryVariables>(GetProductOptionsDocument, options);
        }
export type GetProductOptionsQueryHookResult = ReturnType<typeof useGetProductOptionsQuery>;
export type GetProductOptionsLazyQueryHookResult = ReturnType<typeof useGetProductOptionsLazyQuery>;
export type GetProductOptionsSuspenseQueryHookResult = ReturnType<typeof useGetProductOptionsSuspenseQuery>;
export type GetProductOptionsQueryResult = Apollo.QueryResult<GetProductOptionsQuery, GetProductOptionsQueryVariables>;
export const GetProductByIdDocument = gql`
    query GetProductById($getProductByIdId: Float!) {
  getProductById(id: $getProductByIdId) {
    id
    name
    description
    price
    created_at
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
}
    `;

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      getProductByIdId: // value for 'getProductByIdId'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables> & ({ variables: GetProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export function useGetProductByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductByIdSuspenseQuery>;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;