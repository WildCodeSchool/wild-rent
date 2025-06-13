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
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

export type CategoryInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: Scalars['String']['output'];
  createNewCategory: Category;
  createNewOrder: Order;
  createProduct: Product;
  deleteCategory: Scalars['String']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  modifyCategory: Category;
  register: Scalars['String']['output'];
};


export type MutationConfirmEmailArgs = {
  code_by_user: Scalars['String']['input'];
};


export type MutationCreateNewCategoryArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateNewOrderArgs = {
  data: OrderInput;
};


export type MutationCreateProductArgs = {
  data: ProductInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationModifyCategoryArgs = {
  data: CategoryInput;
};


export type MutationRegisterArgs = {
  data: UserInput;
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

export type OrderInput = {
  created_at: Scalars['DateTimeISO']['input'];
  products: Array<ProductInOrderInput>;
  rental_end_date: Scalars['DateTimeISO']['input'];
  rental_start_date: Scalars['DateTimeISO']['input'];
  total_price: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type PictureInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  url: Scalars['String']['input'];
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
  tags: Array<Tag>;
};

export type ProductInOrder = {
  __typename?: 'ProductInOrder';
  order: Order;
  productOption: ProductOption;
  quantity: Scalars['Float']['output'];
};

export type ProductInOrderInput = {
  productOptionId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type ProductInput = {
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pictures?: InputMaybe<Array<PictureInput>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  product_options?: InputMaybe<Array<ProductOptionInput>>;
};

export type ProductOption = {
  __typename?: 'ProductOption';
  id: Scalars['Float']['output'];
  product: Product;
  size: Scalars['String']['output'];
  total_quantity: Scalars['Float']['output'];
};

export type ProductOptionInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  total_quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: Array<Category>;
  getAllOrders: Array<Order>;
  getAllTags: Array<Tag>;
  getAllUsers: Array<User>;
  getProductByCategory: Array<Product>;
  getProductById: Product;
  getProductOptions: Array<ProductOption>;
  getProductWithFilters: Array<Product>;
  getTagsByCategory: Array<Tag>;
  getUserInfo: UserInfo;
};


export type QueryGetProductByCategoryArgs = {
  category: Scalars['Float']['input'];
};


export type QueryGetProductByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetProductOptionsArgs = {
  productId: Scalars['Float']['input'];
};


export type QueryGetProductWithFiltersArgs = {
  categoryId: Scalars['Float']['input'];
  maxPrice: Scalars['Float']['input'];
  minPrice: Scalars['Float']['input'];
  tags: Array<Scalars['String']['input']>;
};


export type QueryGetTagsByCategoryArgs = {
  category: Scalars['Float']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  category: Category;
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  products: Array<Product>;
};

export type User = {
  __typename?: 'User';
  address: Address;
  created_at: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  last_name: Scalars['String']['output'];
  orders: Array<Order>;
  phone_number: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  isLoggedIn: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UserInput = {
  email: Scalars['String']['input'];
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone_number: Scalars['String']['input'];
};

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type ConfirmEmailMutationVariables = Exact<{
  codeByUser: Scalars['String']['input'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: string };

export type CreateProductMutationVariables = Exact<{
  data: ProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', created_at: any, description: string, id: number, name: string, price: number, category: { __typename?: 'Category', title: string, id: number, image: string }, product_options: Array<{ __typename?: 'ProductOption', id: number, size: string, total_quantity: number }>, pictures: Array<{ __typename?: 'Picture', id: number, url: string }> } };

export type CreateNewOrderMutationVariables = Exact<{
  data: OrderInput;
}>;


export type CreateNewOrderMutation = { __typename?: 'Mutation', createNewOrder: { __typename?: 'Order', created_at: any, total_price: number, rental_start_date: any, rental_end_date: any, status: string, user: { __typename?: 'User', id: number }, products_in_order: Array<{ __typename?: 'ProductInOrder', quantity: number, productOption: { __typename?: 'ProductOption', size: string, total_quantity: number, product: { __typename?: 'Product', id: number } } }> } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, image: string, title: string }> };

export type GetProductByCategoryQueryVariables = Exact<{
  category: Scalars['Float']['input'];
}>;


export type GetProductByCategoryQuery = { __typename?: 'Query', getProductByCategory: Array<{ __typename?: 'Product', name: string, price: number, id: number, category: { __typename?: 'Category', title: string }, pictures: Array<{ __typename?: 'Picture', id: number, url: string }> }> };

export type GetProductWithFiltersQueryVariables = Exact<{
  maxPrice: Scalars['Float']['input'];
  minPrice: Scalars['Float']['input'];
  categoryId: Scalars['Float']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetProductWithFiltersQuery = { __typename?: 'Query', getProductWithFilters: Array<{ __typename?: 'Product', name: string, price: number, id: number, category: { __typename?: 'Category', title: string }, pictures: Array<{ __typename?: 'Picture', id: number, url: string }> }> };

export type GetProductOptionsQueryVariables = Exact<{
  productId: Scalars['Float']['input'];
}>;


export type GetProductOptionsQuery = { __typename?: 'Query', getProductOptions: Array<{ __typename?: 'ProductOption', id: number, size: string, total_quantity: number }> };

export type GetProductByIdQueryVariables = Exact<{
  getProductByIdId: Scalars['Float']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById: { __typename?: 'Product', id: number, name: string, description: string, price: number, created_at: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, product_options: Array<{ __typename?: 'ProductOption', size: string, id: number }> } };

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', getUserInfo: { __typename?: 'UserInfo', isLoggedIn: boolean, email?: string | null, user?: { __typename?: 'User', created_at: any, email: string, first_name: string, id: number, last_name: string, phone_number: string, role: string, address: { __typename?: 'Address', street: string, city: string, zipcode: string, country: string } } | null } };

export type GetTagsByCategoryQueryVariables = Exact<{
  category: Scalars['Float']['input'];
}>;


export type GetTagsByCategoryQuery = { __typename?: 'Query', getTagsByCategory: Array<{ __typename?: 'Tag', id: number, label: string }> };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', getAllOrders: Array<{ __typename?: 'Order', created_at: any, total_price: number, rental_start_date: any, rental_end_date: any, status: string, user: { __typename?: 'User', id: number }, products_in_order: Array<{ __typename?: 'ProductInOrder', quantity: number, productOption: { __typename?: 'ProductOption', size: string, total_quantity: number, product: { __typename?: 'Product', id: number, name: string, price: number } } }> }> };


export const RegisterDocument = gql`
    mutation Register($data: UserInput!) {
  register(data: $data)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($codeByUser: String!) {
  confirmEmail(code_by_user: $codeByUser)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      codeByUser: // value for 'codeByUser'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const CreateProductDocument = gql`
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
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateNewOrderDocument = gql`
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
export type CreateNewOrderMutationFn = Apollo.MutationFunction<CreateNewOrderMutation, CreateNewOrderMutationVariables>;

/**
 * __useCreateNewOrderMutation__
 *
 * To run a mutation, you first call `useCreateNewOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewOrderMutation, { data, loading, error }] = useCreateNewOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewOrderMutation, CreateNewOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewOrderMutation, CreateNewOrderMutationVariables>(CreateNewOrderDocument, options);
      }
export type CreateNewOrderMutationHookResult = ReturnType<typeof useCreateNewOrderMutation>;
export type CreateNewOrderMutationResult = Apollo.MutationResult<CreateNewOrderMutation>;
export type CreateNewOrderMutationOptions = Apollo.BaseMutationOptions<CreateNewOrderMutation, CreateNewOrderMutationVariables>;
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
export const GetProductWithFiltersDocument = gql`
    query GetProductWithFilters($maxPrice: Float!, $minPrice: Float!, $categoryId: Float!, $tags: [String!]!) {
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

/**
 * __useGetProductWithFiltersQuery__
 *
 * To run a query within a React component, call `useGetProductWithFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductWithFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductWithFiltersQuery({
 *   variables: {
 *      maxPrice: // value for 'maxPrice'
 *      minPrice: // value for 'minPrice'
 *      categoryId: // value for 'categoryId'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useGetProductWithFiltersQuery(baseOptions: Apollo.QueryHookOptions<GetProductWithFiltersQuery, GetProductWithFiltersQueryVariables> & ({ variables: GetProductWithFiltersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductWithFiltersQuery, GetProductWithFiltersQueryVariables>(GetProductWithFiltersDocument, options);
      }
export function useGetProductWithFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductWithFiltersQuery, GetProductWithFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductWithFiltersQuery, GetProductWithFiltersQueryVariables>(GetProductWithFiltersDocument, options);
        }
export function useGetProductWithFiltersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductWithFiltersQuery, GetProductWithFiltersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductWithFiltersQuery, GetProductWithFiltersQueryVariables>(GetProductWithFiltersDocument, options);
        }
export type GetProductWithFiltersQueryHookResult = ReturnType<typeof useGetProductWithFiltersQuery>;
export type GetProductWithFiltersLazyQueryHookResult = ReturnType<typeof useGetProductWithFiltersLazyQuery>;
export type GetProductWithFiltersSuspenseQueryHookResult = ReturnType<typeof useGetProductWithFiltersSuspenseQuery>;
export type GetProductWithFiltersQueryResult = Apollo.QueryResult<GetProductWithFiltersQuery, GetProductWithFiltersQueryVariables>;
export const GetProductOptionsDocument = gql`
    query GetProductOptions($productId: Float!) {
  getProductOptions(productId: $productId) {
    id
    size
    total_quantity
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
export const GetUserInfoDocument = gql`
    query GetUserInfo {
  getUserInfo {
    isLoggedIn
    email
    user {
      address {
        street
        city
        zipcode
        country
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

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export function useGetUserInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoSuspenseQueryHookResult = ReturnType<typeof useGetUserInfoSuspenseQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const GetTagsByCategoryDocument = gql`
    query GetTagsByCategory($category: Float!) {
  getTagsByCategory(category: $category) {
    id
    label
  }
}
    `;

/**
 * __useGetTagsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetTagsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetTagsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetTagsByCategoryQuery, GetTagsByCategoryQueryVariables> & ({ variables: GetTagsByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsByCategoryQuery, GetTagsByCategoryQueryVariables>(GetTagsByCategoryDocument, options);
      }
export function useGetTagsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsByCategoryQuery, GetTagsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsByCategoryQuery, GetTagsByCategoryQueryVariables>(GetTagsByCategoryDocument, options);
        }
export function useGetTagsByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTagsByCategoryQuery, GetTagsByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTagsByCategoryQuery, GetTagsByCategoryQueryVariables>(GetTagsByCategoryDocument, options);
        }
export type GetTagsByCategoryQueryHookResult = ReturnType<typeof useGetTagsByCategoryQuery>;
export type GetTagsByCategoryLazyQueryHookResult = ReturnType<typeof useGetTagsByCategoryLazyQuery>;
export type GetTagsByCategorySuspenseQueryHookResult = ReturnType<typeof useGetTagsByCategorySuspenseQuery>;
export type GetTagsByCategoryQueryResult = Apollo.QueryResult<GetTagsByCategoryQuery, GetTagsByCategoryQueryVariables>;
export const QueryDocument = gql`
    query Query {
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
          price
        }
        size
        total_quantity
      }
    }
  }
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;