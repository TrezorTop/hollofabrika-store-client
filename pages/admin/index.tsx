import { useQuery } from "@apollo/client";
import {
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { AdminLayout } from "../../core/shared/layouts/layout";
import { graphql } from "../../gql";

const baseRoute = "/admin/orders/";

const OrdersQuery = graphql(`
  query Orders($input: OrdersQueryInput) {
    orders(input: $input) {
      items {
        id
        date
        totalSum
        products {
          covers
        }
        expiresIn
        isCompleted
      }
    }
  }
`);

export default function Orders() {
  const pageSize = 50;

  const router = useRouter();

  const { data, loading } = useQuery(OrdersQuery);

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Заказы</Heading>
      </Flex>

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Дата</Th>
            <Th></Th>
            <Th>Статус</Th>
            <Th isNumeric>Общая стоимость</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.orders?.items.map((item) => (
            <Tr key={item.id}>
              <Td>{DateTime.fromISO(item.date!).toFormat("dd.LL.yyyy HH:mm")}</Td>
              <Td></Td>
              <Td>{item.isCompleted ? "Завершен" : "Открыт"}</Td>
              <Td isNumeric>
                {Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                }).format(item.totalSum ?? 0)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}

Orders.getLayout = AdminLayout;
