import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../gql";
import { authStore } from "../store";

type Props = {
  onLogin: () => void;
};

const Register = graphql(`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      code
    }
  }
`);

export const RegisterForm = ({ onLogin }: Props) => {
  const snap = useSnapshot(authStore);

  const [register, { data, loading, error }] = useMutation(Register, {
    variables: {
      email: snap.login,
      username: snap.login,
      password: snap.password,
    },
  });

  return (
    <>
      <Input
        value={snap.login}
        onChange={(event) => (authStore.login = event.target.value)}
        placeholder="Login"
      />
      <Input
        value={snap.email}
        onChange={(event) => (authStore.email = event.target.value)}
        placeholder="Email"
      />
      <Input
        value={snap.password}
        onChange={(event) => (authStore.password = event.target.value)}
        placeholder="Password"
      />
      <Input placeholder="Repeat Password" />

      <Button onClick={() => register()}>Register</Button>
      <Button variant="link" onClick={onLogin}>
        Login
      </Button>
    </>
  );
};
