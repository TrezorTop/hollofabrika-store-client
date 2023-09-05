import { useMutation } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import NextLink from "next/link";
import { FC, useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../../gql";
import { globalStore } from "../../../../../store/store";

const CreateOrderMutation = graphql(`
  mutation CreateOrder($productsIds: [Id!]) {
    createOrder(productsIds: $productsIds) {
      token
      expiresIn
    }
  }
`);

export const Cart: FC = () => {
  const [code, setCode] = useState<string>("");
  const snap = useSnapshot(globalStore);

  const [createOrder, { loading: loadingCreateOrder, data: createOrderData }] =
    useMutation(CreateOrderMutation, {
      variables: {
        productsIds: snap.cart.map((product) => product.id),
      },
      onCompleted: () => {
        globalStore.cart = [];
      },
    });

  const expirationDate = useMemo(() => {
    if (!createOrderData?.createOrder.expiresIn) return "";

    const date = new Date(createOrderData?.createOrder.expiresIn * 1000);

    return DateTime.fromJSDate(date).toFormat("dd.LL.yyyy HH:mm");
  }, [createOrderData?.createOrder.expiresIn]);

  if (!snap.cart.length && !createOrderData?.createOrder.token)
    return (
      <Text textAlign="center" fontSize="xl" color="gray">
        Корзина пуста
      </Text>
    );

  return (
    <Flex direction="column" gap="16px" padding="16px">
      {snap.cart.map((product) => (
        <Card key={product.id} flexDirection="column" gap="8px">
          <CardBody padding="12px">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              key={product.id}
            >
              <Link>
                <Text fontSize="xl">{product.name}</Text>
              </Link>
              <Text fontSize="2xl">
                {Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                }).format(product.price)}
              </Text>
            </Flex>
          </CardBody>

          <Divider color="gray.400" margin="0" />

          <CardFooter
            padding="12px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color="gray.500">{product.category}</Text>

            <IconButton
              onClick={() => {
                globalStore.cart = globalStore.cart.filter(
                  (cartProduct) => cartProduct.id !== product.id
                );
              }}
              aria-label="Delete"
              icon={<DeleteIcon />}
            />
          </CardFooter>
        </Card>
      ))}
      {!!snap.cart.length && (
        <Button isDisabled={!snap.cart.length} onClick={() => createOrder()}>
          Создать заказ
        </Button>
      )}
      {!globalStore.cart.length && createOrderData?.createOrder.token && (
        <>
          <div>
            Заказ создан, его можно посмотреть в вашем{" "}
            <Link as={NextLink} color="teal.500" href={"/profile"}>
              профиле
            </Link>
            <br />
            Код для подтверждения:
          </div>

          <Badge textAlign="center" fontSize="4xl" variant="outline">
            {createOrderData?.createOrder.token}
          </Badge>
        </>
      )}
    </Flex>
  );
};
