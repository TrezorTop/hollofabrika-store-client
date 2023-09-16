import { useQuery } from "@apollo/client";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { useAuth } from "../../core/shared/hooks/useAuth";
import { globalStore } from "../../core/store/store";

import { graphql } from "../../gql";

import s from "./profile.module.scss";

const UserOrdersQuery = graphql(`
  query UserOrders {
    orders {
      items {
        id
        totalSum
        products {
          id
          name
          category
          covers
          buyedWithPrice
        }
        date
        expiresIn
        confirmCode
        isCompleted
      }
    }
  }
`);

export default function Profile() {
  const snap = useSnapshot(globalStore);

  const { data: ordersQuery, refetch } = useQuery(UserOrdersQuery);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (snap.cart.length === 0) refetch();
  }, [refetch, snap]);

  const router = useRouter();

  useAuth();

  return (
    <div>
      <Heading size="xl" marginBottom="32px">
        Ваши заказы
      </Heading>

      <Stack flexDirection="column" divider={<StackDivider />} gap="16px">
        {!ordersQuery?.orders.items.length && (
          <Text textAlign="center" fontSize="4xl">
            У вас пока нет заказов
          </Text>
        )}

        {ordersQuery?.orders.items.map((order, index, array) => {
          const currentDate = DateTime.fromISO(order.date ?? "");
          const previousDate = DateTime.fromISO(array[index - 1]?.date ?? "");

          return (
            <div key={order.id}>
              {!currentDate.hasSame(previousDate, "day") && (
                <Heading size="lg" marginBottom="16px">
                  {currentDate.toFormat("dd.LL.yyyy")}
                </Heading>
              )}
              <Card>
                <CardHeader>
                  <Heading size="md">
                    {order.isCompleted ? "Завершенный" : "Открытый"} заказ
                    {order.expiresIn &&
                      " - действителен до " +
                        DateTime.fromISO(order.expiresIn).toFormat(
                          "dd.LL.yyyy HH:mm"
                        )}
                  </Heading>
                </CardHeader>
                <Divider color="gray.400" />
                <CardBody>
                  <Stack spacing="3">
                    <Stack gap="4" divider={<StackDivider />}>
                      {order.products?.map((product) => (
                        <Grid
                          key={product.id}
                          className={s.item}
                          gap="4"
                        >
                          <Image
                            borderRadius="8px"
                            key={(order.id ?? "0") + (product.id ?? "0")}
                            height="100%"
                            maxHeight="100px"
                            src={product.covers?.[0]}
                            onClick={() =>
                              router.push(`/product/${product.id}`)
                            }
                            cursor="pointer"
                            margin="0 auto"
                          />
                          <Stack>
                            <Text>{product.name}</Text>
                            <Text fontSize="s" color="gray.500">
                              {product.category}
                            </Text>
                            <Text>
                              Куплено по цене:{" "}
                              {Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                              }).format(product.buyedWithPrice ?? 0)}
                            </Text>
                          </Stack>
                        </Grid>
                      ))}
                    </Stack>
                  </Stack>
                </CardBody>
                <Divider color="gray.400" />
                <CardFooter
                  gap="4"
                  display="flex"
                  flexDirection="column"
                  flexWrap="wrap"
                >
                  {!order.isCompleted && (
                    <Flex alignItems="center" gap="4">
                      <Text color="blue.600" fontSize="2xl">
                        Код подтверждения:{" "}
                        <Badge
                          textAlign="center"
                          fontSize="4xl"
                          variant="outline"
                        >
                          {order.confirmCode}
                        </Badge>
                      </Text>
                    </Flex>
                  )}
                  <Text color="blue.600" fontSize="2xl">
                    Общая цена:{" "}
                    {Intl.NumberFormat("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    }).format(order.totalSum ?? 0)}
                  </Text>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}
