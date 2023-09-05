import { useQuery } from "@apollo/client";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

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
  }, [categoriesData?.categories, form]);

  useEffect(() => {
    const attrs = categoriesData?.categories
      .filter((category) => form.categories.includes(category.name))
      .map((category) => category.attributes)
      .flat();

    const keysToClear = Object.keys(form.attributes).filter(
      (attrKey) => !attrs?.find((attr) => attr?.name === attrKey)
    );

    const newAttrs = Object.fromEntries(
      Object.entries(form.attributes).filter(
        ([key, value]) => !keysToClear.includes(key)
      )
    );

    if (keysToClear.length) {
      updateForm({
        attributes: {
          ...newAttrs,
        },
      });
    }
  }, [categoriesData?.categories, form, updateForm]);

  const onRefetch = (noFilters?: boolean) => {
    const attributes: ProductInputAttribute[] = [];

    Object.entries(form.attributes).forEach(([name, attrs]) => {
      attrs.forEach((attr) => attributes.push({ name, value: attr }));
    });

    if (noFilters)
      return refetch({
        input: {},
      });

    return refetch({
      input: {
        filter: {
          attributes: attributes.length ? attributes : undefined,
          logic: FilterLogic.Or,
        },
        categories: form.categories,
      },
    });
  };

  return (
    <Flex flexDirection="column" gap="32px">
      <div className={s.controls}>
        <Button ref={btnRef} onClick={onOpen}>
          Фильтровать
        </Button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => onClose()}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Фильтр</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" gap="16px">
              <Select
                options={categoriesData?.categories.map((category) => ({
                  value: category.name,
                  label: category.name,
                }))}
                onChange={(values) => {
                  updateForm({
                    categories: values.map((value) => value.value),
                  });
                }}
                value={form.categories.map((category) => ({
                  value: category,
                  label: category,
                }))}
                placeholder="Категория"
                isClearable
                isMulti
              />

              {attributes?.map((attribute) => {
                const values = form.attributes[attribute?.name!];

                return (
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
                          [attribute?.name!]: attributes.map(
                            (attr) => attr.value
                          ),
                        },
                      });
                    }}
                    value={values?.map((value) => ({
                      value,
                      label: `${value} (${
                        attribute?.values?.find(
                          (option) => option.value === value
                        )?.count
                      })`,
                    }))}
                    closeMenuOnSelect={false}
                    isMulti
                    placeholder={attribute?.name}
                  />
                );
              })}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              mr={3}
              onClick={() => {
                updateForm({ categories: [], attributes: {} });
                onClose();
                onRefetch(true);
              }}
            >
              Очистить
            </Button>
            <Button colorScheme="blue" onClick={() => onRefetch()}>
              Применить
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
