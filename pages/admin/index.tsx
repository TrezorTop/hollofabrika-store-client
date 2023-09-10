import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import Select from "react-select";
import { useForm } from "../../core/shared/hooks/useForm";
import { AdminLayout } from "../../core/shared/layouts/layout";
import { graphql } from "../../gql";

const baseRoute = "/admin/orders/";

const OrdersQuery = graphql(`
  query Orders($input: OrdersQueryInput) {
    orders(input: $input) {
      items {
        id
        date
        totalSum
        products {
          category
          name
          price
          buyedWithPrice
          id
          covers
        }
        expiresIn
        isCompleted
      }
    }
  }
`);

type Form = {
  from: string;
  to: string;
  productsIds: string[];
  usersIds: string[];
  isCompleted: boolean;
};

export default function Orders() {
  const [activeOrderId, setActiveOrderId] = useState<string>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { form, updateForm } = useForm<Form>();

  const { data, loading, refetch } = useQuery(OrdersQuery, {
    variables: {
      input: {
        isAdmin: true,
      },
    },
  });

  const onRefetch = (noFilters?: boolean) => {
    if (noFilters)
      return refetch({
        input: {
          isAdmin: true,
        },
      });

    return refetch({
      input: {
        datePeriod: {
          from: form.from,
          to: form.to,
        },
        productsIds: form.productsIds,
        usersIds: form.usersIds,
        isCompleted: form.isCompleted,
        isAdmin: true,
      },
    });
  };

  const router = useRouter();

  const activeOrder = useMemo(() => {
    return data?.orders.items.find((order) => order.id === activeOrderId);
  }, [activeOrderId, data?.orders.items]);

  return (
    <Flex flexDirection="column" gap="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Заказы</Heading>

        <Button ref={btnRef} onClick={onOpen}>
          Фильтровать
        </Button>
      </Flex>

      {activeOrder && (
        <Modal isOpen={isOpenModal} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent alignSelf="center" maxHeight="80%" overflow="auto">
            <ModalHeader>Заказ {activeOrder.id}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Stack>
                <Text fontSize="xl">
                  Товаров: {activeOrder.products?.length}
                </Text>

                <Grid gridTemplateColumns="1fr" gap={4}>
                  {activeOrder.products?.map((product) => (
                    <Card key={product.id}>
                      <CardBody padding={2} display="flex" gap={4}>
                        <Image maxWidth="100px" src={product.covers?.[0]} />
                        <Stack gap={1}>
                          <Text
                            textDecoration="underline"
                            cursor="pointer"
                            onClick={() => router.push(`/product/${product.id}`)}
                          >
                            {product.name}
                          </Text>

                          <Text>
                            Цена:{" "}
                            {Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: "RUB",
                            }).format(product.price ?? 0)}
                          </Text>

                          <Text>
                            Заказано по цене:{" "}
                            {Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: "RUB",
                            }).format(product.buyedWithPrice ?? 0)}
                          </Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>

                <Text fontSize="xl">
                  Дата создания:{" "}
                  {DateTime.fromISO(activeOrder.date!).toFormat(
                    "dd.LL.yyyy HH:mm"
                  )}
                </Text>
                <Text fontSize="xl">
                  Статус: {activeOrder.isCompleted ? "Закрыт" : "Открыт"}
                </Text>
                {activeOrder.expiresIn && (
                  <Text fontSize="xl">
                    Дата истечения:{" "}
                    {DateTime.fromISO(activeOrder.expiresIn).toFormat(
                      "dd.LL.yyyy HH:mm"
                    )}
                  </Text>
                )}
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Text fontSize="xl">
                Общая цена:{" "}
                {Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                }).format(activeOrder.totalSum ?? 0)}
              </Text>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

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
            <Flex flexDirection="column" gap={4}>
              <Text>Дата заказов от:</Text>
              <Input
                onChange={(event) =>
                  updateForm({
                    from: new Date(event.target.value).toISOString(),
                  })
                }
                value={DateTime.fromISO(form.from).toFormat("yyyy-LL-dd")}
                type="date"
              />

              <Text>Дата заказов до:</Text>
              <Input
                onChange={(event) =>
                  updateForm({ to: new Date(event.target.value).toISOString() })
                }
                value={DateTime.fromISO(form.to).toFormat("yyyy-LL-dd")}
                type="date"
              />

              <Select
                isClearable
                placeholder="Статус"
                onChange={(option) =>
                  updateForm({ isCompleted: option?.value })
                }
                value={
                  form.isCompleted !== undefined && form.isCompleted !== null
                    ? form.isCompleted
                      ? {
                          label: "Завершен",
                          value: true,
                        }
                      : {
                          label: "Открыт",
                          value: false,
                        }
                    : null
                }
                options={[
                  {
                    label: "Завершен",
                    value: true,
                  },
                  {
                    label: "Открыт",
                    value: false,
                  },
                ]}
              />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              mr={3}
              onClick={() => {
                updateForm({
                  usersIds: undefined,
                  productsIds: undefined,
                  to: undefined,
                  from: undefined,
                });
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

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Идентификатор</Th>
            <Th>Дата</Th>
            <Th>Статус</Th>
            <Th isNumeric>Общая стоимость</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.orders?.items.map((item) => (
            <Tr
              key={item.id}
              cursor="pointer"
              onClick={() => {
                setActiveOrderId(item.id!);
                onOpenModal();
              }}
            >
              <Td>{item.id}</Td>
              <Td>
                {DateTime.fromISO(item.date!).toFormat("dd.LL.yyyy HH:mm")}
              </Td>
              <Td>{item.isCompleted ? "Завершен" : "Открыт"}</Td>
              <Td isNumeric>
                {Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                }).format(item.totalSum ?? 0)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}

Orders.getLayout = AdminLayout;
