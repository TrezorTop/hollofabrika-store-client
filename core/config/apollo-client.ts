import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  gql,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { getUserToken, setUserTokens } from "../shared/utils/auth";
import { USER_REFRESH_TOKEN_KEY } from "../shared/utils/consts";
import { globalStore } from "../store/store";

export const API_URL = "http://26.109.83.16:3333/graphql";

const refreshToken = () => {
  return client.mutate({
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
  });
};

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

  const isWrongTokenError = graphQLErrors?.some(
    (error) =>
      error.message === "Refresh_WrongTokenError" ||
      error.message === "Refresh_UsedTokenError"
  );

  if (isWrongTokenError) {
    setUserTokens("", "");
    return forward(operation);
  }

  if (isUnauthorizedError) {
    const token = localStorage.getItem(USER_REFRESH_TOKEN_KEY);
    if (!token) return forward(operation);

    return new Observable((observer) => {
      refreshToken()
        ?.then((response) => {
          const { access, refresh } = response.data.refresh;

          if (!access || !refresh) {
            globalStore.account = "null";
            return forward(operation);
          }

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

const uploadLink = createUploadLink({
  uri: API_URL,
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const client = new ApolloClient({
  // @ts-ignore
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
});

export default client;
