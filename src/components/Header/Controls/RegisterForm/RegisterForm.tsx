import { authStore } from "@/components/Header/Controls/store";
import { graphql } from "@/gql";
import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useSnapshot } from "valtio";

const Register = graphql(`
  mutation Register($email: String!, $password: String!, $username: String!) {
    register(email: $email, username: $username, password: $password) {
      message
      code
    }
  }
`);

type Props = {
  onLogin: () => void;
};

export const RegisterForm = ({ onLogin }: Props) => {
  const authSnap = useSnapshot(authStore);

  const [mutate, { data, error, loading }] = useMutation(Register, {
    variables: {
      email: "test@mail.ru",
      username: "test",
      password: "test",
    },
  });

  return (
    <>
      <Input
        value={authSnap.login}
        onChange={(event) => (authStore.login = event.target.value)}
        placeholder="Login"
      />
      <Input
        value={authSnap.email}
        onChange={(event) => (authStore.email = event.target.value)}
        placeholder="Email"
      />
      <Input
        value={authSnap.password}
        onChange={(event) => (authStore.password = event.target.value)}
        placeholder="Password"
      />
      <Input placeholder="Repeat Password" />

      <Button onClick={() => mutate()}>Register</Button>
      <Button variant="link" onClick={onLogin}>
        Login
      </Button>
    </>
  );
};
