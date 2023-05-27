"use client";

import { LoginForm } from "@/components/Header/Controls/LoginForm/LoginForm";
import { RegisterForm } from "@/components/Header/Controls/RegisterForm/RegisterForm";
import { authStore } from "@/components/Header/Controls/store";
import { graphql } from "@/gql";
import { globalStore } from "@/utils/globalStore";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useSnapshot } from "valtio";
import s from "./Controls.module.css";

enum Form {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

const Users = graphql(`
  query Users {
    users {
      email
    }
  }
`);

export const Controls = () => {
  const snap = useSnapshot(globalStore);
  const authSnap = useSnapshot(authStore);
  const [form, setForm] = useState<Form>(Form.LOGIN);

  const { data } = useSuspenseQuery(Users);
  
  console.log(data.users)

  return (
    <div className={s.controls}>
      <Popover>
        <PopoverTrigger>
          <div>{snap.account}</div>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <Heading size="md">Login</Heading>
          </PopoverHeader>
          <PopoverBody>
            <Flex direction="column" gap="16px" padding="16px">
              {form === Form.LOGIN && (
                <LoginForm onRegister={() => setForm(Form.REGISTER)} />
              )}
              {form === Form.REGISTER && (
                <RegisterForm onLogin={() => setForm(Form.LOGIN)} />
              )}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <div>Cart</div>
    </div>
  );
};
