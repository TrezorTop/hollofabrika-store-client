import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductEdit } from "../../../core/shared/components/ProductEdit/ProductEdit";
import { AdminLayout } from "../layout";

export default function Product() {
  const router = useRouter();

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Product</Heading> <Button>Save</Button>
      </Flex>
      <ProductEdit />
    </Flex>
  );
}

Product.getLayout = AdminLayout;
