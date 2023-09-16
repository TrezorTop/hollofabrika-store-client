import { Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Errors } from "../../../../gql/graphql";

type Props = {
  error?: Errors | string | undefined;
  children?: ReactNode;
};

export const ErrorText: FC<Props> = ({ error, children }) => {
  return (
    <Text color={"red.500"} textAlign="center">
      {error === Errors.LoginWrongUsernameError && "Неверный логин"}
      {error === Errors.LoginWrongPasswordError && "Неверный пароль"}

      {error === Errors.RegisterEmailSendingError && "Неверный email"}
      {error === Errors.RegisterEmailInUseError && "Данный email уже используется"}
      {error === Errors.RegisterUsernameInUseError && "Данный логин уже используется"}

      {error === Errors.VerifyEmailWrongToken && "Неверный код"}
      {children}
    </Text>
  );
};
