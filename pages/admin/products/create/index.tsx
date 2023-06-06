import { Button, Flex, Heading } from "@chakra-ui/react";
import { ProductEdit } from "../../../../core/shared/components/ProductEdit/ProductEdit";
import { AdminLayout } from "../../layout";

export default function Create() {
  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Product</Heading> <Button>Save</Button>
      </Flex>
      <ProductEdit />
    </Flex>
  );
}

Create.getLayout = AdminLayout;
