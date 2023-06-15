import { useMutation } from "@apollo/client";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductEdit } from "../../../core/shared/components/ProductEdit/ProductEdit";
import { graphql } from "../../../gql";
import { AdminLayout } from "../layout";

const UpdateProduct = graphql(`
  mutation UpdateProduct($id: Id!, $product: UpdateProductArgs!) {
    updateProduct(id: $id, product: $product) {
      id
      name
      attributes {
        name
        value
      }
      description
      category
      price
    }
  }
`);

export default function Product() {
  const router = useRouter();

  const [update, { data }] = useMutation(UpdateProduct);

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Product</Heading>
      </Flex>
      <ProductEdit
        onSubmit={(product, attributes, newCategory) =>
          update({
            variables: {
              id: "",
              product: {
                name: product.name,
                price: product.price,
                description: product.description,
                attributes: attributes,
              },
            },
          })
        }
      />
    </Flex>
  );
}

Product.getLayout = AdminLayout;
