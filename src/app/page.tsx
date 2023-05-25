import { graphql } from "@/gql";
import { graphqlClient } from "@/lib/graphql-client";
import s from "./page.module.css";

const GetBooks = graphql(`
  query GetBooks {
    books {
      title
    }
    persons {
      name
    }
  }
`);

export default async function Home() {
  const { books, persons } = await graphqlClient.request(GetBooks);

  // return <pre>{JSON.stringify({ books, persons }, null, 2)}</pre>;
  return <pre></pre>;
}
