import { graphql } from "@/gql";
import { graphqlClient } from "@/lib/graphql-client";

const GetBooks = graphql(`
  query GetAllBooks {
    books {
      title
      author
    }
  }
`);

export default async function Item() {
  const { books } = await graphqlClient.request(GetBooks);

  return <pre>{JSON.stringify(books, null, 2)}</pre>;
}
