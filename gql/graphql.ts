/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateProductArgs = {
  name: Scalars['String']['input'];
};

export type Error = {
  __typename?: 'Error';
  code?: Maybe<ErrorCode>;
  message: Scalars['String']['output'];
};

export enum ErrorCode {
  BadRequest = 'BadRequest',
  InternalError = 'InternalError'
}

export type JwtToken = {
  __typename?: 'JwtToken';
  access: Scalars['String']['output'];
  refresh: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct?: Maybe<RegisterResponse>;
  login?: Maybe<JwtToken>;
  refresh?: Maybe<JwtToken>;
  register?: Maybe<RegisterResponse>;
  verifyEmail?: Maybe<Success>;
};


export type MutationCreateProductArgs = {
  input: CreateProductArgs;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRefreshArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationVerifyEmailArgs = {
  confirmToken: Scalars['String']['input'];
  emailToken: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  confirmToken?: Maybe<Scalars['String']['output']>;
};

export enum Role {
  Admin = 'Admin',
  Standalone = 'Standalone'
}

export type SomethingWentWrong = {
  __typename?: 'SomethingWentWrong';
  errors: Array<Error>;
};

export type Success = {
  __typename?: 'Success';
  code?: Maybe<SuccessCode>;
};

export enum SuccessCode {
  ConfirmAction = 'ConfirmAction',
  Oke = 'Oke'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  role: Role;
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'JwtToken', refresh: string, access: string } | null };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'RegisterResponse', confirmToken?: string | null } | null };

export type ConfirmMutationVariables = Exact<{
  confirmToken: Scalars['String']['input'];
  emailToken: Scalars['Int']['input'];
}>;


export type ConfirmMutation = { __typename?: 'Mutation', verifyEmail?: { __typename?: 'Success', code?: SuccessCode | null } | null };

export type RefreshMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshMutation = { __typename?: 'Mutation', refresh?: { __typename?: 'JwtToken', refresh: string, access: string } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', email: string, username: string } | null> | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}},{"kind":"Field","name":{"kind":"Name","value":"access"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmToken"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ConfirmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Confirm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"confirmToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"emailToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<ConfirmMutation, ConfirmMutationVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refresh"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}},{"kind":"Field","name":{"kind":"Name","value":"access"}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;