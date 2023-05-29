import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const API_URL = "http://26.109.83.16:3333/graphql";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  headers: {
    TEST: "TEST",
  },
  link: new HttpLink({
    uri: API_URL,
    fetchOptions: {
      // mode: "no-cors",
    },
  }),
});

export default client;
