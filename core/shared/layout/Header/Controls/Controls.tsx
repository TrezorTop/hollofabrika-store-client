"use client";

import { useQuery } from "@apollo/client";
import { Flex, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../gql";
import { globalStore } from "../../../../store/globalStore";
import { Popup } from "../../../components/Popup/Popup";
import { Account } from "./Account/Account";
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
        body={
          <Flex direction="column" gap="16px" padding="16px">
            {!snap.account ? (
              <>
                {form === Form.LOGIN && (
                  <LoginForm onRegister={() => setForm(Form.REGISTER)} />
                )}
                {form === Form.REGISTER && (
                  <RegisterForm onSuccess={() => setForm(Form.LOGIN)} />
                )}
              </>
            ) : (
              <Account />
            )}
          </Flex>
        }
      >
        <Link>{snap.account ?? "Login"}</Link>
      </Popup>
      <div>Cart</div>
    </div>
  );
};
