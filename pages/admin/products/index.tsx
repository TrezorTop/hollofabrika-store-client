import { useQuery } from "@apollo/client";
import {
  Button,
  Flex,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { graphql } from "../../../gql";

import { AdminLayout } from "../layout";

const baseRoute = "/admin/products/";

const ProductsQuery = graphql(`
  query Products($ids: [String], $pageData: PageDataInput) {
    products(ids: $ids, pageData: $pageData) {
      pageData {
        totalPages
        page
        pageSize
      }
      items {
        id
        name
        price
        attributes
      }
    }
  }
`);

export default function Products() {
  const pageSize = 50;

  const router = useRouter();

  const { data, loading, fetchMore } = useQuery(ProductsQuery, {
    variables: { ids: [], pageData: { page: 1, pageSize } },
  });

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Products</Heading>{" "}
        <Button onClick={() => router.push(baseRoute + "create")}>
          Create
        </Button>
      </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th isNumeric>price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.products.items.map((item) => (
            <Tr
              key={item.id}
              cursor="pointer"
              onClick={() => router.push(baseRoute + "1234")}
            >
              <Td>{item.name}</Td>
              <Td isNumeric>{item.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}

Products.getLayout = AdminLayout;
