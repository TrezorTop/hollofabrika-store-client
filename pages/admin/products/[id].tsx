import { useLazyQuery, useMutation } from "@apollo/client";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
      covers
      description
      category
      price
    }
  }
`);

const ProductQuery = graphql(`
  query Product($id: Id!) {
    product(id: $id) {
      id
      description
      price
      attributes {
        value
        name
      }
      category
      name
    }
  }
`);

export default function Product() {
  const router = useRouter();

  const [update, { data }] = useMutation(UpdateProduct);

  const [getProduct, { loading, data: product }] = useLazyQuery(ProductQuery);

  useEffect(() => {
    if (router.query.id)
      getProduct({
        variables: {
          id: router.query.id as string,
        },
      });
  }, [getProduct, router.query.id]);

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Product</Heading>
      </Flex>
      <ProductEdit
        onSubmit={(product, attributes, newCategory) =>
          update({
            variables: {
              id: product.id,
              product: {
                name: product.name,
                price: product.price,
                description: product.description,
                attributes: attributes,
                covers: product.covers,
              },
            },
          })
        }
        product={product?.product}
      />
    </Flex>
  );
}

Product.getLayout = AdminLayout;
