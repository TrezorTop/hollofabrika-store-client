import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { Errors } from "../../../../gql/graphql";

type Props = {
  error: Errors | string | undefined;
};

export const ErrorText: FC<Props> = ({ error }) => {
  return (
    <Text color={"red.500"} textAlign="center">
      {error === Errors.LoginWrongUsernameError && "Неверный логин"}
    </Text>
  );
};
