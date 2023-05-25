"use client";

import { LoginForm } from "@/components/Header/Controls/LoginForm/LoginForm";
import { RegisterForm } from "@/components/Header/Controls/RegisterForm/RegisterForm";
import { globalStore } from "@/lib/globalStore";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
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

export const Controls = () => {
  const snap = useSnapshot(globalStore);
  const [form, setForm] = useState<Form>(Form.LOGIN);

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
