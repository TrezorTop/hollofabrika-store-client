import { useMutation } from "@apollo/client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { ProductEdit } from "../../../../core/shared/components/ProductEdit/ProductEdit";
import { graphql } from "../../../../gql";
import { AdminLayout } from "../../layout";

const CreateProduct = graphql(`
  mutation CreateProduct($category: String!, $product: CreateProductArgs!) {
    createProduct(category: $category, product: $product) {
      name
      attributes {
        name
        value
      }
      id
      description
      category
      price
    }
  }
`);

export default function Create() {
  const [create, { data }] = useMutation(CreateProduct, {
    variables: {
      product: {
        name: "",
        price: 1,
        attributes: [],
        description: "",
      },
      category: "",
    },
  });

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Product</Heading> <Button>Create</Button>
      </Flex>
      <ProductEdit />
    </Flex>
  );
}

Create.getLayout = AdminLayout;
