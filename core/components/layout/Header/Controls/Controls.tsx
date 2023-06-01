"use client";

import {
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { globalStore } from "../../../../store/globalStore";
import s from "./Controls.module.css";
import { graphql } from "../../../../../gql";
import { useQuery } from "@apollo/client";
import { LoginForm } from "./LoginForm/LoginForm";
import { RegisterForm } from "./RegisterForm/RegisterForm";
import { Popup } from "../../../ui/Modal/Popup";

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
