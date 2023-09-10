import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../../gql";
import { authStore, globalStore } from "../../../../../store/store";
import { useForm } from "../../../../hooks/useForm";
import { ErrorText } from "../../../../ui/ErrorText/ErrorText";
import { setUserTokens } from "../../../../utils/auth";

const LoginMutation = graphql(`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      refresh
      access
    }
  }
`);

const UserQuery = graphql(`
  query User {
    currentUser {
      username
      role
    }
  }
`);

type Form = {
  login: string;
  password: string;
};

type Props = {
  onRegister: () => void;
};

export const LoginForm = ({ onRegister }: Props) => {
  const snap = useSnapshot(authStore);

  const { form, updateForm, errors, setErrors } = useForm<Form>();
  const [getUser, { loading, data: user }] = useLazyQuery(UserQuery);

  const [login, { data: loginData, error }] = useMutation(LoginMutation, {
    variables: {
      username: form.login,
      password: form.password,
    },
    onCompleted: async (data) => {
      if (!data.login) return;
      setUserTokens(data.login?.access!, data.login?.refresh!);
      const user = await getUser();
      if (user.data?.currentUser.username)
        globalStore.account = user.data?.currentUser;
    },
  });

  const isValid = () => {
    if (!form.login) return false;
    if (!form.password) return false;

    return true;
  };

  return (
    <>
      <Input
        onChange={(event) => updateForm({ login: event.target.value })}
        placeholder="Логин или email"
      />

      <Input
        onChange={(event) => updateForm({ password: event.target.value })}
        placeholder="Пароль"
      />

      <ErrorText error={error?.message} />

      <Button onClick={() => login()} isDisabled={!isValid()}>
        Войти
      </Button>
      <Button variant="outline" onClick={onRegister}>
        Регистрация
      </Button>
      {/*<Button variant="link">Забыли пароль?</Button>*/}
    </>
  );
};
