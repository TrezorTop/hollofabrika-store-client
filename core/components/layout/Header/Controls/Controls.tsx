"use client";

import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../gql";
import { globalStore } from "../../../../store/globalStore";
import { Popup } from "../../../ui/Popup/Popup";
import s from "./Controls.module.css";
import { LoginForm } from "./LoginForm/LoginForm";

import { RegisterForm } from "./RegisterForm/RegisterForm";

enum Form {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

const User = graphql(`
  query User {
    currentUser {
      username
    }
  }
`);

export const Controls = () => {
  const snap = useSnapshot(globalStore);
  const [form, setForm] = useState<Form>(Form.LOGIN);
  const { loading, data } = useQuery(User);

  useEffect(() => {
    if (data?.currentUser?.username) {
      globalStore.account = data?.currentUser?.username;
    }
  }, [data]);

  return (
    <div className={s.controls}>
      <Popup
        header="Login"
        body={
          <Flex direction="column" gap="16px" padding="16px">
            {form === Form.LOGIN && (
              <LoginForm onRegister={() => setForm(Form.REGISTER)} />
            )}
            {form === Form.REGISTER && (
              <RegisterForm onSuccess={() => setForm(Form.LOGIN)} />
            )}
          </Flex>
        }
      >
        {globalStore.account ?? "Login"}
      </Popup>
      <div>Cart</div>
    </div>
  );
};
