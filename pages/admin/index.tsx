import { Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

const baseRoute = "/admin/";

const Admin = () => {
  return <>TEST</>;
};

const NestedLayout: FC = ({ children }) => {
  return (
    <Flex gap="24">
      <Flex flexDirection="column" gap="16px">
        <Heading size="md" marginBottom="32px">
          Admin
        </Heading>
        <Link as={NextLink} href={baseRoute + "products"}>
          Products
        </Link>
      </Flex>
      {children}
    </Flex>
  );
};

export const AdminLayout = (page) => <NestedLayout>{page}</NestedLayout>;

Admin.getLayout = AdminLayout;

export default Admin;
