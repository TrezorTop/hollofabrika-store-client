import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../../gql";
import { Role } from "../../../../../../gql/graphql";
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

const OrderQuery = graphql(`
  query FindOrderByCode($input: OrdersQueryInput) {
    orders(input: $input) {
      items {
        id
        products {
          id
          name
          category
          buyedWithPrice
          covers
        }
        totalSum
        date
      }
    }
  }
`);

export const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const snap = useSnapshot(globalStore);

  const [code, setCode] = useState<string>("");

  const [confirmOrder, { error: confirmError, data: confirmData }] =
    useMutation(ConfirmOrderMutation, {
      variables: {
        token: code,
      },
      onCompleted: () => {
        setCode("");
      },
    });

  const [getOrder, { loading, data: order }] = useLazyQuery(OrderQuery, {
    variables: {
      input: {
        orderTokens: [code],
        isAdmin: true
      },
    },
  });

  const logout = useCallback(() => {
    globalStore.account = null;
    setUserTokens("", "");
  }, []);

  return (
    <>
      <Flex gap="16px" alignItems="center">
        <Heading size="lg">{snap.account?.username}</Heading>
      </Flex>
      <Divider />
      <Link as={NextLink} href="/profile">
        Ваши заказы
      </Link>
      {snap.account?.role === Role.Admin && (
        <Link as={NextLink} href="/admin">
          Администратор
        </Link>
      )}
      {snap.account?.role === Role.Admin && (
        <Link onClick={onOpen}>Подтвердить заказ</Link>
      )}
      <Link color="tomato" onClick={logout}>
        Выйти
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Form>
          <ModalOverlay />
          <ModalContent alignSelf="center" maxHeight="80%" overflow="auto">
            <ModalHeader>Подтверждение заказа</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Stack spacing="3">
                {order?.orders.items.length && (
                  <>
                    <Heading size="md">Заказ:</Heading>
                    {order?.orders.items[0]?.products?.map((product) => (
                      <Card key={product.id}>
                        <CardBody>
                          <Flex justifyContent="space-between">
                            <Grid
                              gridTemplateColumns="100px 1fr"
                              alignItems="center"
                              gap={4}
                            >
                              <Image src={product.covers?.[0]} />
                              <div>
                                <Text>{product.name}</Text>
                                <Text fontSize="s" color="gray.500">
                                  {product.category}
                                </Text>
                              </div>
                            </Grid>
                            <Box textAlign="right">
                              <Text fontSize="xs">Цена при оформлении: </Text>
                              <Badge>
                                {Intl.NumberFormat("ru-RU", {
                                  style: "currency",
                                  currency: "RUB",
                                }).format(product.buyedWithPrice)}
                              </Badge>
                            </Box>
                          </Flex>
                        </CardBody>
                      </Card>
                    ))}
                  </>
                )}
                {confirmError && (
                  <Text color="tomato">Неверный код заказа.</Text>
                )}
                {confirmData?.confirmOrder.id && (
                  <Text color="green.500">Заказ успешно закрыт.</Text>
                )}
                <Input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="Код заказа"
                />
                {order?.orders.items[0] && (
                  <Heading size="md" textAlign="right">
                    Общая сумма:{" "}
                    {Intl.NumberFormat("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    }).format(order?.orders.items[0].totalSum ?? 0)}
                  </Heading>
                )}
              </Stack>
            </ModalBody>

            <ModalFooter gap="16px">
              <Button
                isDisabled={!code}
                type="submit"
                colorScheme="blue"
                onClick={() => {
                  if (order?.orders.items.length) {
                    confirmOrder();
                  } else {
                    getOrder();
                  }
                }}
              >
                {order?.orders.items.length ? "Подтвердить" : "Найти заказ"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
};
