import { useMutation } from "@apollo/client";
import { Flex, Heading } from "@chakra-ui/react";
import { ProductEdit } from "../../../../core/shared/components/ProductEdit/ProductEdit";
import { AdminLayout } from "../../../../core/shared/layouts/layout";
import { adminStore } from "../../../../core/store/store";
import { graphql } from "../../../../gql";

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
      isSafeDeleted
    }
  }
`);

const CreateCategory = graphql(`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      name
    }
  }
`);

export default function Create() {
  const [createCategory] = useMutation(CreateCategory);

  const [createProduct] = useMutation(CreateProduct, {
    onCompleted: (data) => {
      adminStore.products?.items.push(data.createProduct);
    },
  });

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Новый товар</Heading>
      </Flex>
      <ProductEdit
        onSubmit={async (product, attributes, category) => {
          const productCategory =
            category ||
            (await createCategory({
              variables: { name: product.newCategory },
            }).then((data) => data.data?.createCategory.name));

          await createProduct({
            variables: {
              category: productCategory!,
              product: {
                name: product.name,
                price: product.price,
                description: product.description,
                attributes: attributes,
                covers: product.covers,
              },
            },
          });
        }}
      />
    </Flex>
  );
}

Create.getLayout = AdminLayout;
