import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

import { AdminLayout } from "../../../core/shared/layouts/layout";
import { adminStore } from "../../../core/store/store";
import { graphql } from "../../../gql";

const baseRoute = "/admin/products/";

const ProductsQuery = graphql(`
  query Products($input: ProductsQueryInput) {
    products(input: $input) {
      pageData {
        totalPages
        page
        pageSize
      }
      items {
        id
        name
        price
        category
        attributes {
          value
          name
        }
        isSafeDeleted
      }
    }
  }
`);

const UpdateProductDeleted = graphql(`
  mutation UpdateProductDeleted($id: Id!, $product: UpdateProductArgs!) {
    updateProduct(id: $id, product: $product) {
      id
    }
  }
`);

export default function Products() {
  const [deleted, setDeleted] = useState<string[]>([]);
  const [restored, setRestored] = useState<string[]>([]);
  const [showDeleted, setShowDeleted] = useState<boolean>(false);

  const snap = useSnapshot(adminStore);

  const btnRef = useRef<HTMLButtonElement>(null);

  const pageSize = 50;

  const router = useRouter();

  const { data, loading, fetchMore, refetch } = useQuery(ProductsQuery, {
    variables: {
      input: { ids: [], pageData: { page: 1, pageSize }, isAdmin: true },
    },
    onCompleted: (data) => {
      adminStore.products = data.products;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [update, { loading: updateLoading }] =
    useMutation(UpdateProductDeleted);

  const save = async () => {
    await Promise.all([
      ...deleted.map((id) => {
        return update({
          variables: {
            id,
            product: {
              isSafeDeleted: true,
            },
          },
        });
      }),
      ...restored.map((id) => {
        return update({
          variables: {
            id,
            product: {
              isSafeDeleted: false,
            },
          },
        });
      }),
    ]);

    toast({
      title: "Успешно",
      description: "Список товаров обновлён",
      status: "success",
    });

    refetch();
    setDeleted([]);
    setRestored([]);
  };

  const toast = useToast();

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Товары</Heading>

        <Flex gap={4} alignItems="center">
          <FormControl display="flex" alignItems="center" width="fit-content">
            <FormLabel htmlFor="email-alerts" mb="0">
              Показать удалённые
            </FormLabel>
            <Switch
              onChange={() => setShowDeleted((prev) => !prev)}
              checked={showDeleted}
              id="email-alerts"
            />
          </FormControl>
          <Button
            isDisabled={
              (!deleted.length && !restored.length) || loading || updateLoading
            }
            onClick={() => save()}
          >
            Сохранить
          </Button>
          <Button onClick={() => router.push(baseRoute + "create")}>
            Добавить товар
          </Button>
        </Flex>
      </Flex>

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Имя</Th>
            <Th>Категория</Th>
            <Th isNumeric>Цена</Th>
          </Tr>
        </Thead>
        <Tbody>
          {snap.products?.items
            .filter(
              (item) =>
                item.isSafeDeleted === showDeleted ||
                item.isSafeDeleted === false
            )
            .map((item) => (
              <Tr
                key={item.id}
                cursor="pointer"
                onClick={() => router.push(baseRoute + item.id)}
              >
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td isNumeric>
                  {Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  }).format(item.price)}
                </Td>
                <Td isNumeric onClick={(event) => event.stopPropagation()}>
                  {deleted?.includes(item.id) ||
                  (item.isSafeDeleted && !restored.includes(item.id)) ? (
                    <Button
                      onClick={() => {
                        const isDeleted = deleted?.includes(item.id);

                        if (isDeleted)
                          return setDeleted((prev) =>
                            prev?.filter((id) => id !== item.id)
                          );

                        setRestored((prev) => prev.concat(item.id));
                      }}
                      colorScheme="blue"
                    >
                      Восстановить
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        const isRestored = restored?.includes(item.id);

                        if (isRestored)
                          return setRestored((prev) =>
                            prev.filter((id) => id !== item.id)
                          );

                        setDeleted((prev) => prev?.concat(item.id));
                      }}
                      colorScheme="red"
                    >
                      Удалить
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Flex>
  );
}

Products.getLayout = AdminLayout;
