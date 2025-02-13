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
  image: Scalars['String']['output'];
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
  getAllCategories: Array<Category>;
  getAllUsers: Array<User>;
  getProductByCategory: Array<Product>;
  getProductById: Product;
};


export type QueryGetProductByCategoryArgs = {
  category: Scalars['Float']['input'];
};


export type QueryGetProductByIdArgs = {
  id: Scalars['Float']['input'];
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

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, image: string, title: string }> };

export type GetProductByCategoryQueryVariables = Exact<{
  category: Scalars['Float']['input'];
}>;


export type GetProductByCategoryQuery = { __typename?: 'Query', getProductByCategory: Array<{ __typename?: 'Product', name: string, price: number, id: number, category: { __typename?: 'Category', title: string }, pictures: Array<{ __typename?: 'Picture', id: number, url: string }> }> };


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
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  getAllCategories {
    id
    image
    title
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetProductByCategoryDocument = gql`
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

/**
 * __useGetProductByCategoryQuery__
 *
 * To run a query within a React component, call `useGetProductByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetProductByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetProductByCategoryQuery, GetProductByCategoryQueryVariables> & ({ variables: GetProductByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByCategoryQuery, GetProductByCategoryQueryVariables>(GetProductByCategoryDocument, options);
      }
export function useGetProductByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByCategoryQuery, GetProductByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByCategoryQuery, GetProductByCategoryQueryVariables>(GetProductByCategoryDocument, options);
        }
export function useGetProductByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductByCategoryQuery, GetProductByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductByCategoryQuery, GetProductByCategoryQueryVariables>(GetProductByCategoryDocument, options);
        }
export type GetProductByCategoryQueryHookResult = ReturnType<typeof useGetProductByCategoryQuery>;
export type GetProductByCategoryLazyQueryHookResult = ReturnType<typeof useGetProductByCategoryLazyQuery>;
export type GetProductByCategorySuspenseQueryHookResult = ReturnType<typeof useGetProductByCategorySuspenseQuery>;
export type GetProductByCategoryQueryResult = Apollo.QueryResult<GetProductByCategoryQuery, GetProductByCategoryQueryVariables>;