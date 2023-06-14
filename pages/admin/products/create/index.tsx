import { useMutation } from "@apollo/client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { ProductEdit } from "../../../../core/shared/components/ProductEdit/ProductEdit";
import { adminStore } from "../../../../core/store/store";
import { graphql } from "../../../../gql";
import { AdminLayout } from "../../layout";

const CreateProduct = graphql(`
  mutation CreateProduct($category: String!, $product: CreateProductArgs!) {
    createProduct(category: $category, product: $product) {
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

export default function Create() {
  const [create, { data }] = useMutation(CreateProduct, {
    onCompleted: (data) => {
      adminStore.products?.items.push(data.createProduct);
    },
  });

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Product</Heading>
      </Flex>
      <ProductEdit
        onSubmit={(product, attributes, newCategory) =>
          create({
            variables: {
              category: product.category,
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

Create.getLayout = AdminLayout;
