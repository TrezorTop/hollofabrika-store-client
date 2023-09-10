import { useQuery } from "@apollo/client";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useAuth } from "../../core/shared/hooks/useAuth";

import { graphql } from "../../gql";

const UserOrdersQuery = graphql(`
  query UserOrders {
    orders {
      items {
        id
        totalSum
        products {
          id
          covers
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
  const { data: ordersQuery } = useQuery(UserOrdersQuery);

  const router = useRouter();

  useAuth();

  return (
    <div>
      <Heading size="xl" marginBottom="32px">
        Ваши заказы
      </Heading>

      <Stack flexDirection="column" divider={<StackDivider />} gap="16px">
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
                    <Flex flexWrap="wrap" gap="32px">
                      {order.products?.map((product) => (
                        <Image
                          borderRadius="8px"
                          key={(order.id ?? "0") + (product.id ?? "0")}
                          height="100%"
                          maxHeight="100px"
                          src={product.covers?.[0]}
                          onClick={() => router.push(`/product/${product.id}`)}
                          cursor='pointer'
                        />
                      ))}
                    </Flex>
                  </Stack>
                </CardBody>
                <Divider color="gray.400" />
                <CardFooter
                  gap="6"
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  {!order.isCompleted && (
                    <>
                      <Text color="blue.600" fontSize="2xl">
                        Код подтверждения:
                      </Text>
                      <Badge
                        textAlign="center"
                        fontSize="4xl"
                        variant="outline"
                      >
                        {order.confirmCode}
                      </Badge>
                    </>
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
