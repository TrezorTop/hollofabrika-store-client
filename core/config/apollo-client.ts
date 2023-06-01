import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  fromPromise,
  gql,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { from } from "rxjs";
import { getUserToken, setUserTokens } from "../utils/auth";
import { USER_REFRESH_TOKEN_KEY } from "../utils/consts";

export const API_URL = "http://26.109.83.16:3333/graphql";

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the token from wherever you have stored it (e.g., local storage, cookies)
  const token = getUserToken();

  // Add the token to the authorization header
  operation.setContext(({ headers }: any) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const isUnauthorizedError = graphQLErrors?.some(
    (error) => error.message === "Unauthorized"
  );

  if (isUnauthorizedError) {
    return new Observable((observer) => {
      client
        .mutate({
          mutation: gql`
            mutation Refresh($token: String!) {
              refresh(token: $token) {
                refresh
                access
              }
            }
          `,
          variables: {
            token: localStorage.getItem(USER_REFRESH_TOKEN_KEY),
          },
        })
        .then((response) => {
          const { access, refresh } = response.data.refresh;

          setUserTokens(access, refresh);
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${access}`,
            },
          }));
        })
        .then(() => {
          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };

          forward(operation).subscribe(subscriber);
        });
    });
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink, authLink]),
  cache: new InMemoryCache(),
});

export default client;
