import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../../gql";
import { setUserTokens } from "../../../../../utils/auth";
import { authStore } from "../store";
import { globalStore } from "../../../../../store/globalStore";

type Props = {
  onRegister: () => void;
};

const Login = graphql(`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      refresh
      access
    }
  }
`);

export const LoginForm = ({ onRegister }: Props) => {
  const snap = useSnapshot(authStore);

  const [login, { data }] = useMutation(Login, {
    variables: {
      username: snap.login,
      password: snap.password,
    },
  });

  useEffect(() => {
    if (!data) return;

    globalStore.account = "USER";
    setUserTokens(data.login?.access!, data.login?.refresh!);
  }, [data]);

  return (
    <>
      <Input
        defaultValue={snap.email ?? snap.login}
        onChange={(event) => (authStore.login = event.target.value)}
        placeholder="Login or email"
      />
      <Input
        defaultValue={snap.password}
        onChange={(event) => (authStore.password = event.target.value)}
        placeholder="Password"
      />

      <Button onClick={() => login()}>Login</Button>
      <Button variant="outline" onClick={onRegister}>
        Register
      </Button>
      <Button variant="link">Forgot password</Button>
    </>
  );
};
