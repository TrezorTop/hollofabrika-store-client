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
    "\n  query User {\n    currentUser {\n      username\n    }\n  }\n": types.UserDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refresh\n      access\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      confirmToken\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Confirm($confirmToken: String!, $emailToken: Int!) {\n    verifyEmail(confirmToken: $confirmToken, emailToken: $emailToken) {\n      code\n    }\n  }\n": types.ConfirmDocument,
    "\n  query Products($ids: [String], $pageData: PageDataInput) {\n    products(ids: $ids, pageData: $pageData) {\n      pageData {\n        totalPages\n        page\n        pageSize\n      }\n      items {\n        id\n        name\n        price\n        attributes\n      }\n    }\n  }\n": types.ProductsDocument,
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
export function graphql(source: "\n  query User {\n    currentUser {\n      username\n    }\n  }\n"): (typeof documents)["\n  query User {\n    currentUser {\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refresh\n      access\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refresh\n      access\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      confirmToken\n    }\n  }\n"): (typeof documents)["\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      confirmToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Confirm($confirmToken: String!, $emailToken: Int!) {\n    verifyEmail(confirmToken: $confirmToken, emailToken: $emailToken) {\n      code\n    }\n  }\n"): (typeof documents)["\n  mutation Confirm($confirmToken: String!, $emailToken: Int!) {\n    verifyEmail(confirmToken: $confirmToken, emailToken: $emailToken) {\n      code\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products($ids: [String], $pageData: PageDataInput) {\n    products(ids: $ids, pageData: $pageData) {\n      pageData {\n        totalPages\n        page\n        pageSize\n      }\n      items {\n        id\n        name\n        price\n        attributes\n      }\n    }\n  }\n"): (typeof documents)["\n  query Products($ids: [String], $pageData: PageDataInput) {\n    products(ids: $ids, pageData: $pageData) {\n      pageData {\n        totalPages\n        page\n        pageSize\n      }\n      items {\n        id\n        name\n        price\n        attributes\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;