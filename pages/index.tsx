import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import client from "../config/apollo-client";
import { graphql } from "../gql";

const Users = graphql(`
  query Users {
    users {
      email
      username
    }
  }
`);

export async function getServerSideProps() {
  const { data } = await client.query({
    query: Users,
  });

  return {
    props: {
      countries: data.users,
    },
  };
}

const Home = ({
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </div>
  );
};

export default Home;
