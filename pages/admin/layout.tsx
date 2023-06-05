import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement, ReactNode } from "react";

const baseRoute = "/admin/";

const NestedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex gap="24">
      <Flex flexDirection="column" gap="16px">
        <Link as={NextLink} href={baseRoute}>
          <Heading size="md" marginBottom="32px">
            Admin
          </Heading>
        </Link>
        <Link as={NextLink} href={baseRoute + "products"}>
          Products
        </Link>
      </Flex>
      <Box width="100%">{children}</Box>
    </Flex>
  );
};

export const AdminLayout = (page: ReactElement) => (
  <NestedLayout>{page}</NestedLayout>
);
