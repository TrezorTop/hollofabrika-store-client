import { Avatar, Divider, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useCallback } from "react";
import { globalStore } from "../../../../../store/store";
import { setUserTokens } from "../../../../utils/auth";

export const Account = () => {
  const logout = useCallback(() => {
    globalStore.account = null;
    setUserTokens("", "");
  }, []);

  return (
    <>
      <Flex gap="16px" alignItems="center">
        <Avatar name={globalStore.account!} src="" />
        <Heading size="lg">{globalStore.account}</Heading>
      </Flex>
      <Divider />
      <Link>Аккаунт</Link>
      <Link as={NextLink} href="/admin">
        Администратор
      </Link>
      <Link color="tomato" onClick={logout}>
        Выйти
      </Link>
    </>
  );
};
