/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      mutation Refresh($token: String!) {\n        refresh(token: $token) {\n          refresh\n          access\n        }\n      }\n    ": types.RefreshDocument,
    "\n  query ProductCategories {\n    categories {\n      name\n      attributes {\n        name\n      }\n    }\n  }\n": types.ProductCategoriesDocument,
    "\n  mutation ConfirmOrder($token: String!) {\n    confirmOrder(token: $token) {\n      id\n    }\n  }\n": types.ConfirmOrderDocument,
    "\n  mutation CreateOrder($productsIds: [Id!]) {\n    createOrder(productsIds: $productsIds) {\n      token\n      expiresIn\n    }\n  }\n": types.CreateOrderDocument,
    "\n  query User {\n    currentUser {\n      username\n    }\n  }\n": types.UserDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refresh\n      access\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      code\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Confirm($emailToken: String!) {\n    verifyEmail(emailToken: $emailToken) {\n      code\n    }\n  }\n": types.ConfirmDocument,
    "\n  mutation UpdateProduct($id: Id!, $product: UpdateProductArgs!) {\n    updateProduct(id: $id, product: $product) {\n      id\n      name\n      attributes {\n        name\n        value\n      }\n      covers\n      description\n      category\n      price\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation CreateCategory($name: String!) {\n    createCategory(name: $name) {\n      name\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  query Product($id: Id!) {\n    product(id: $id) {\n      id\n      description\n      price\n      attributes {\n        value\n        name\n      }\n      category\n      name\n      covers\n    }\n  }\n": types.ProductDocument,
    "\n  mutation ChangeCategory($id: Id!, $category: String!) {\n    changeCategory(id: $id, category: $category) {\n      name\n      id\n    }\n  }\n": types.ChangeCategoryDocument,
    "\n  query Categories {\n    categories {\n      name\n    }\n  }\n": types.CategoriesDocument,
    "\n  mutation CreateProduct($category: String!, $product: CreateProductArgs!) {\n    createProduct(category: $category, product: $product) {\n      id\n      name\n      attributes {\n        name\n        value\n      }\n      description\n      category\n      price\n    }\n  }\n": types.CreateProductDocument,
    "\n  query Products($input: ProductsQueryInput) {\n    products(input: $input) {\n      pageData {\n        totalPages\n        page\n        pageSize\n      }\n      items {\n        id\n        name\n        price\n        attributes {\n          value\n          name\n        }\n      }\n    }\n  }\n": types.ProductsDocument,
    "\n  query MainProducts($input: ProductsQueryInput) {\n    products(input: $input) {\n      pageData {\n        totalPages\n        pageSize\n        page\n      }\n      items {\n        name\n        category\n        price\n        description\n        id\n        covers\n      }\n    }\n  }\n": types.MainProductsDocument,
    "\n  query MainCategories {\n    categories {\n      name\n      attributes {\n        name\n        values {\n          value\n          count\n        }\n      }\n    }\n  }\n": types.MainCategoriesDocument,
    "\n  query ProductItemQuery($id: Id!) {\n    product(id: $id) {\n      id\n      category\n      covers\n      description\n      price\n      name\n      attributes {\n        name\n        value\n      }\n    }\n  }\n": types.ProductItemQueryDocument,
    "\n  query UserOrders {\n    orders {\n      items {\n        id\n        totalSum\n        products {\n          id\n          covers\n        }\n        date\n        expiresIn\n        confirmCode\n        isCompleted\n      }\n    }\n  }\n": types.UserOrdersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation Refresh($token: String!) {\n        refresh(token: $token) {\n          refresh\n          access\n        }\n      }\n    "): (typeof documents)["\n      mutation Refresh($token: String!) {\n        refresh(token: $token) {\n          refresh\n          access\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductCategories {\n    categories {\n      name\n      attributes {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductCategories {\n    categories {\n      name\n      attributes {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfirmOrder($token: String!) {\n    confirmOrder(token: $token) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation ConfirmOrder($token: String!) {\n    confirmOrder(token: $token) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrder($productsIds: [Id!]) {\n    createOrder(productsIds: $productsIds) {\n      token\n      expiresIn\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($productsIds: [Id!]) {\n    createOrder(productsIds: $productsIds) {\n      token\n      expiresIn\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User {\n    currentUser {\n      username\n    }\n  }\n"): (typeof documents)["\n  query User {\n    currentUser {\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refresh\n      access\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refresh\n      access\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      code\n    }\n  }\n"): (typeof documents)["\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      code\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Confirm($emailToken: String!) {\n    verifyEmail(emailToken: $emailToken) {\n      code\n    }\n  }\n"): (typeof documents)["\n  mutation Confirm($emailToken: String!) {\n    verifyEmail(emailToken: $emailToken) {\n      code\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct($id: Id!, $product: UpdateProductArgs!) {\n    updateProduct(id: $id, product: $product) {\n      id\n      name\n      attributes {\n        name\n        value\n      }\n      covers\n      description\n      category\n      price\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProduct($id: Id!, $product: UpdateProductArgs!) {\n    updateProduct(id: $id, product: $product) {\n      id\n      name\n      attributes {\n        name\n        value\n      }\n      covers\n      description\n      category\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCategory($name: String!) {\n    createCategory(name: $name) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($name: String!) {\n    createCategory(name: $name) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Product($id: Id!) {\n    product(id: $id) {\n      id\n      description\n      price\n      attributes {\n        value\n        name\n      }\n      category\n      name\n      covers\n    }\n  }\n"): (typeof documents)["\n  query Product($id: Id!) {\n    product(id: $id) {\n      id\n      description\n      price\n      attributes {\n        value\n        name\n      }\n      category\n      name\n      covers\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeCategory($id: Id!, $category: String!) {\n    changeCategory(id: $id, category: $category) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeCategory($id: Id!, $category: String!) {\n    changeCategory(id: $id, category: $category) {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Categories {\n    categories {\n      name\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    categories {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($category: String!, $product: CreateProductArgs!) {\n    createProduct(category: $category, product: $product) {\n      id\n      name\n      attributes {\n        name\n        value\n      }\n      description\n      category\n      price\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProduct($category: String!, $product: CreateProductArgs!) {\n    createProduct(category: $category, product: $product) {\n      id\n      name\n      attributes {\n        name\n        value\n      }\n      description\n      category\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products($input: ProductsQueryInput) {\n    products(input: $input) {\n      pageData {\n        totalPages\n        page\n        pageSize\n      }\n      items {\n        id\n        name\n        price\n        attributes {\n          value\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Products($input: ProductsQueryInput) {\n    products(input: $input) {\n      pageData {\n        totalPages\n        page\n        pageSize\n      }\n      items {\n        id\n        name\n        price\n        attributes {\n          value\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MainProducts($input: ProductsQueryInput) {\n    products(input: $input) {\n      pageData {\n        totalPages\n        pageSize\n        page\n      }\n      items {\n        name\n        category\n        price\n        description\n        id\n        covers\n      }\n    }\n  }\n"): (typeof documents)["\n  query MainProducts($input: ProductsQueryInput) {\n    products(input: $input) {\n      pageData {\n        totalPages\n        pageSize\n        page\n      }\n      items {\n        name\n        category\n        price\n        description\n        id\n        covers\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MainCategories {\n    categories {\n      name\n      attributes {\n        name\n        values {\n          value\n          count\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MainCategories {\n    categories {\n      name\n      attributes {\n        name\n        values {\n          value\n          count\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductItemQuery($id: Id!) {\n    product(id: $id) {\n      id\n      category\n      covers\n      description\n      price\n      name\n      attributes {\n        name\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductItemQuery($id: Id!) {\n    product(id: $id) {\n      id\n      category\n      covers\n      description\n      price\n      name\n      attributes {\n        name\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserOrders {\n    orders {\n      items {\n        id\n        totalSum\n        products {\n          id\n          covers\n        }\n        date\n        expiresIn\n        confirmCode\n        isCompleted\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserOrders {\n    orders {\n      items {\n        id\n        totalSum\n        products {\n          id\n          covers\n        }\n        date\n        expiresIn\n        confirmCode\n        isCompleted\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;