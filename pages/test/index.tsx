import { useQuery } from "@apollo/client";
import { graphql } from "../../gql";

const Users = graphql(`
  query Users {
    users {
      email
      username
    }
  }
`);

const Test = () => {
  const { data, loading, error } = useQuery(Users);

  return <pre>{JSON.stringify(data ?? null, null, 2)}</pre>;
};

export default Test;
