import { useQuery } from "@apollo/client";
import {
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { adminStore } from "../../../core/store/store";
import { graphql } from "../../../gql";

import { AdminLayout } from "../layout";

const baseRoute = "/admin/products/";

const ProductsQuery = graphql(`
  query Products($input: ProductsQueryInput) {
    products(input: $input) {
      pageData {
        totalPages
        page
        pageSize
      }
      items {
        id
        name
        price
        attributes {
          value
          name
        }
      }
    }
  }
`);

export default function Products() {
  const snap = useSnapshot(adminStore);

  const pageSize = 50;

  const router = useRouter();

  const { data, loading, fetchMore } = useQuery(ProductsQuery, {
    variables: { input: { ids: [], pageData: { page: 1, pageSize } } },
    onCompleted: (data) => {
      adminStore.products = data.products;
    },
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
          {snap.products?.items.map((item) => (
            <Tr
              key={item.id}
              cursor="pointer"
              onClick={() => router.push(baseRoute + item.id)}
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
