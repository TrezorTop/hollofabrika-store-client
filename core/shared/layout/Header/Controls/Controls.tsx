"use client";

import { useQuery } from "@apollo/client";
import { Button, Flex, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../gql";
import { globalStore } from "../../../../store/store";
import { Popup } from "../../../components/Popup/Popup";
import { Account } from "./Account/Account";
import { Cart } from "./Cart/Cart";
import s from "./Controls.module.css";
import { LoginForm } from "./LoginForm/LoginForm";

import { RegisterForm } from "./RegisterForm/RegisterForm";
import { ResetForm } from "./ResetForm/ResetForm";

enum Form {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  PASSWORD_RESET = "PASSWORD_RESET",
}

const User = graphql(`
  query User {
    currentUser {
      username
      role
    }
  }
`);

export const Controls = () => {
  const snap = useSnapshot(globalStore);
  const [form, setForm] = useState<Form>(Form.LOGIN);
  const { loading, data } = useQuery(User);

  useEffect(() => {
    if (data?.currentUser?.username) {
      globalStore.account = data?.currentUser;
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
                  <LoginForm
                    onRegister={() => setForm(Form.REGISTER)}
                    onReset={() => setForm(Form.PASSWORD_RESET)}
                  />
                )}
                {form === Form.REGISTER && (
                  <RegisterForm
                    onSuccess={() => setForm(Form.LOGIN)}
                    onCancel={() => setForm(Form.LOGIN)}
                  />
                )}
                {form === Form.PASSWORD_RESET && (
                  <ResetForm
                    onCancel={() => setForm(Form.LOGIN)}
                    onSuccess={() => setForm(Form.LOGIN)}
                  />
                )}
              </>
            ) : (
              <Account />
            )}
          </Flex>
        }
      >
        <Link>{snap.account?.username ?? "Аккаунт"}</Link>
      </Popup>

      <Popup body={<Cart />}>
        <Button size="md">Корзина</Button>
      </Popup>
    </div>
  );
};
