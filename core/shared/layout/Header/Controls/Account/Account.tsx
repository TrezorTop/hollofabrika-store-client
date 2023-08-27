import { useMutation } from "@apollo/client";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useCallback, useState } from "react";
import { graphql } from "../../../../../../gql";
import { globalStore } from "../../../../../store/store";
import { Form } from "../../../../ui/Form/Form";
import { setUserTokens } from "../../../../utils/auth";

const ConfirmOrderMutation = graphql(`
  mutation ConfirmOrder($token: String!) {
    confirmOrder(token: $token) {
      id
    }
  }
`);

export const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [code, setCode] = useState<string>("");

  const [confirmOrder, {}] = useMutation(ConfirmOrderMutation, {
    variables: {
      token: code,
    },
  });

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
      <Link as={NextLink} href="/profile">Профиль</Link>
      <Link as={NextLink} href="/admin">
        Администратор
      </Link>
      <Link onClick={onOpen}>Подтвердить заказ</Link>
      <Link color="tomato" onClick={logout}>
        Выйти
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Form>
          <ModalOverlay />
          <ModalContent alignSelf="center">
            <ModalHeader>Подтверждение заказа</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Input
                onChange={(event) => setCode(event.target.value)}
                placeholder="Код заказа"
              />
            </ModalBody>

            <ModalFooter gap="16px">
              <Button variant="ghost" onClick={onClose}>
                Отмена
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                onClick={() => confirmOrder()}
              >
                Подтвердить
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
};
