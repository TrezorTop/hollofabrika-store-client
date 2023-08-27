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
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
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

  return (
    <div>
      <Heading size="2xl" marginBottom="32px">
        Ваши заказы
      </Heading>

      <Flex flexDirection="column" gap="16px">
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
                    {order.expiresIn && " - действителен до " + DateTime.fromSeconds(order.expiresIn).toFormat("dd.LL.yyyy HH:mm")}
                  </Heading>
                </CardHeader>
                <Divider />
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
                        />
                      ))}
                    </Flex>
                    <Text color="blue.600" fontSize="2xl">
                      {Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                      }).format(order.totalSum ?? 0)}
                    </Text>
                  </Stack>
                </CardBody>
                {!order.isCompleted && (
                  <>
                    <Divider />
                    <CardFooter>
                      <Badge
                        textAlign="center"
                        fontSize="4xl"
                        variant="outline"
                      >
                        {order.confirmCode}
                      </Badge>
                    </CardFooter>
                  </>
                )}
              </Card>
            </div>
          );
        })}
      </Flex>
    </div>
  );
}
