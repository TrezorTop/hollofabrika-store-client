import { Errors } from "../../../gql/graphql";

export const errorsText = {
  [Errors.LoginWrongUsernameError as string]: "Неверный логин",
  [Errors.LoginWrongPasswordError as string]: "Неверный пароль",
};
