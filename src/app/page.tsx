import { graphql } from "@/gql";
import s from "./page.module.css";

const GetBooks = graphql(`
  query GetBooks {
    books {
      title
    }
  }
`);

export default function Home() {
  return <div></div>;
}
