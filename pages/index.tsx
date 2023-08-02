import { useQuery } from "@apollo/client";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Select from "react-select";
import { useSnapshot } from "valtio";
import { ProductCard } from "../core/shared/components/ProductCard/ProductCard";
import { useForm } from "../core/shared/hooks/useForm";
import { globalStore } from "../core/store/store";
import { graphql } from "../gql";
import { FilterLogic, ProductInputAttribute } from "../gql/graphql";
import s from "../styles/Home.module.scss";

const Products = graphql(`
  query MainProducts($input: ProductsQueryInput) {
    products(input: $input) {
      pageData {
        totalPages
        pageSize
        page
      }
      items {
        name
        category
        price
        description
        id
        covers
      }
    }
  }
`);

const Categories = graphql(`
  query MainCategories {
    categories {
      name
      attributes {
        name
        values {
          value
          count
        }
      }
    }
  }
`);

type TForm = {
  categories: string[];
  attributes: {
    [key: string]: string[];
  };
};

const Home = () => {
  const router = useRouter();

  const globalStoreSnap = useSnapshot(globalStore);

  const { updateForm, form } = useForm<TForm>({
    attributes: {},
    categories: [],
  });

  const { data: productsData, refetch } = useQuery(Products);
  const { data: categoriesData } = useQuery(Categories);

  const attributes = useMemo(() => {
    return categoriesData?.categories
      .filter((category) => form.categories.includes(category.name))
      .map((category) => category.attributes)
      .flat();
  }, [form.categories, categoriesData?.categories]);

  const onRefetch = () => {
    const attributes: ProductInputAttribute[] = [];

    Object.entries(form.attributes).forEach(([name, attrs]) => {
      attrs.forEach((attr) => attributes.push({ name, value: attr }));
    });

    refetch({
      input: {
        filter: {
          attributes: attributes,
          logic: FilterLogic.Or,
        },
      },
    });
  };

  return (
    <Flex flexDirection="column" gap="32px">
      <div className={s.controls}>
        <Select
          options={categoriesData?.categories.map((category) => ({
            value: category.name,
            label: category.name,
          }))}
          onChange={(values) => {
            updateForm({ categories: values.map((value) => value.value) });
          }}
          placeholder="Category"
          isClearable
          isMulti
        />

        {attributes?.map((attribute) => (
          <Select
            key={attribute?.name}
            options={attribute?.values?.map((value) => ({
              value: value.value,
              label: `${value.value} (${value.count})`,
            }))}
            onChange={(attributes) => {
              updateForm({
                attributes: {
                  ...form.attributes,
                  [attribute?.name!]: attributes.map((attr) => attr.value),
                },
              });
            }}
            closeMenuOnSelect={false}
            isMulti
            placeholder={attribute?.name}
          />
        ))}

        <Button onClick={() => onRefetch()}>Применить</Button>
      </div>
      <div className={s.products}>
        {productsData?.products.items.map((product) => (
          <ProductCard
            onClick={() => {
              router.push(`/product/${product.id}`);
            }}
            key={product.id}
            cover={product.covers?.[0]}
            title={product.name}
            subText={Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
            }).format(product.price)}
            text={product.category}
            buttons={
              <Button
                onClick={() => {
                  globalStore.cart.push(product);
                }}
                isDisabled={
                  !!globalStoreSnap.cart.find(
                    (cartProduct) => cartProduct.id === product.id
                  )
                }
              >
                {!!globalStoreSnap.cart.find(
                  (cartProduct) => cartProduct.id === product.id
                )
                  ? "В корзине"
                  : "Добавить в корзину"}
              </Button>
            }
          />
        ))}
      </div>
    </Flex>
  );
};

export default Home;
