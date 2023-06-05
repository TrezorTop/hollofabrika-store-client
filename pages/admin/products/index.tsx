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
import { useRouter } from "next/router";

import { AdminLayout } from "../layout";

const baseRoute = "/admin/products/";

export default function Products() {
  const router = useRouter();

  return (
    <Flex flexDirection="column" gap="32px">
      <Heading>Products</Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr cursor="pointer" onClick={() => router.push(baseRoute + "/1234")}>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  );
}

Products.getLayout = AdminLayout;
