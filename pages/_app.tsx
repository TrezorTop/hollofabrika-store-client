import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@styles/globals.css";
import Layout from "@core/components/layout/Layout";
import ErrorBoundary from "@core/components/ErrorBoundary";
import client from "@core/config/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Layout>
          <Head>
            <title>Hollofabrika</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
