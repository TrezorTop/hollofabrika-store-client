import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../../gql";
import { globalStore } from "../../../../../store/globalStore";
import { setUserTokens } from "../../../../../utils/auth";
import { authStore } from "../store";

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

const User = graphql(`
  query User {
    currentUser {
      username
    }
  }
`);

export const LoginForm = ({ onRegister }: Props) => {
  const snap = useSnapshot(authStore);

  const [getUser, { loading, data: user }] = useLazyQuery(User);

  const [login, { data: loginData }] = useMutation(Login, {
    variables: {
      username: snap.login,
      password: snap.password,
    },
    onCompleted: async (data) => {
      if (!data.login) return;
      setUserTokens(data.login?.access!, data.login?.refresh!);
      const user = await getUser();
      if (user.data?.currentUser.username)
        globalStore.account = user.data?.currentUser.username;
    },
  });

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
