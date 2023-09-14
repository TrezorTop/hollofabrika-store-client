import { useLazyQuery, useMutation } from "@apollo/client";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProductEdit } from "../../../core/shared/components/ProductEdit/ProductEdit";
import { AdminLayout } from "../../../core/shared/layouts/layout";
import { graphql } from "../../../gql";

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

const CreateCategory = graphql(`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      name
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
      covers
      isSafeDeleted
    }
  }
`);

const ChangeCategory = graphql(`
  mutation ChangeCategory($id: Id!, $category: String!) {
    changeCategory(id: $id, category: $category) {
      name
      id
    }
  }
`);

const Categories = graphql(`
  query Categories {
    categories {
      name
    }
  }
`);

export default function Product() {
  const router = useRouter();

  const [getCategories, { data: categories }] = useLazyQuery(Categories);

  const [update, { data }] = useMutation(UpdateProduct);

  const [createCategory] = useMutation(CreateCategory);

  const [getProduct, { loading, data: product }] = useLazyQuery(ProductQuery);

  const [changeCategory] = useMutation(ChangeCategory);

  useEffect(() => {
    if (router.query.id) {
      getProduct({
        variables: {
          id: router.query.id as string,
        },
      });
      getCategories();
    }
  }, [getProduct, getCategories, router.query.id]);

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>{product?.product.name ?? "Товар"}</Heading>
      </Flex>
      <ProductEdit
        onSubmit={async (product, attributes, newCategory) => {
          let newProductId = product.id;

          if (newCategory) {
            const newCategoryAlreadyExists = !!categories?.categories.find(
              (category) => category.name === newCategory
            );

            const category = newCategoryAlreadyExists
              ? newCategory
              : await createCategory({
                  variables: {
                    name: newCategory,
                  },
                }).then((data) => data.data?.createCategory.name);

            category &&
              (await changeCategory({
                variables: { id: product.id, category: category },
                onCompleted: (data) => {
                  newProductId = data.changeCategory.id;
                },
              }));
          }

          const coversToDelete = [...new Set(product.coversNamesToDelete)];

          console.log(product.description);

          await update({
            variables: {
              id: newProductId,
              product: {
                name: product.name,
                price: product.price,
                description: product.description,
                attributes: attributes,
                covers: product.covers,
                coversNamesToDelete: coversToDelete?.map(
                  (cover) => cover.split("/").reverse()[0]
                ),
              },
            },
          });
        }}
        product={product?.product}
      />
    </Flex>
  );
}

Product.getLayout = AdminLayout;
