import { useQuery } from "@apollo/client";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSnapshot } from "valtio";
import { globalStore } from "../../core/store/store";
import { graphql } from "../../gql";

import s from "./index.module.scss";

const ProductQuery = graphql(`
  query ProductItemQuery($id: Id!) {
    product(id: $id) {
      id
      category
      covers
      description
      price
      name
      attributes {
        name
        value
      }
    }
  }
`);

export default function Product() {
  const router = useRouter();

  const globalStoreSnap = useSnapshot(globalStore);

  const { data } = useQuery(ProductQuery, {
    variables: {
      id: router.query.id as string,
    },
  });

  return (
    <Flex flexDirection="column" gap="8">
      <span>
        <Heading>{data?.product.name}</Heading>
        <Text color="gray" fontSize="2xl">
          {data?.product.category}
        </Text>
      </span>
      <Grid className={s.grid} gap={"64px"}>
        <Card height="fit-content">
          {data?.product.covers?.length ? (
            <CardBody>
              <Swiper centeredSlides={true}>
                {data?.product.covers?.map((cover) => (
                  <SwiperSlide key={cover}>
                    <Flex>
                      <Image src={cover} margin={"0 auto"} width="100%" />
                    </Flex>
                  </SwiperSlide>
                ))}
              </Swiper>
            </CardBody>
          ) : (
            <CardBody>
              <Text textAlign={"center"} fontSize="3xl">
                Товар без фото
              </Text>
            </CardBody>
          )}
        </Card>
        <Flex flexDirection="column" gap={6}>
          <Card>
            <CardHeader>
              <Text fontSize="xl">Описание</Text>
            </CardHeader>
            <Divider color="gray.400" />
            <CardBody>{data?.product.description}</CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Text fontSize="xl">Аттрибуты</Text>
            </CardHeader>
            <Divider color="gray.400" />
            <CardBody>
              <Flex flexDirection="column" gap="8px">
                {data?.product.attributes.map((attr) => (
                  <Badge key={attr.name}>
                    <Text
                      display="flex"
                      justifyContent="space-between"
                      fontSize="sm"
                    >
                      <span>{attr.name}:</span> <span>{attr.value}</span>
                    </Text>
                  </Badge>
                ))}
              </Flex>
            </CardBody>
          </Card>
        </Flex>
        <Card height="fit-content">
          <CardBody>
            <Flex justifyContent="space-between" alignItems="center">
              <Text color="gray" fontSize="2xl">
                Цена:
              </Text>
              <Text fontSize="3xl">
                {Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                }).format(data?.product.price ?? 0)}
              </Text>
            </Flex>
          </CardBody>
          <Divider color="gray.400" />
          <CardFooter justifyContent="end">
            <Button
              onClick={() => {
                globalStore.cart.push(data?.product!);
              }}
              isDisabled={
                !!globalStoreSnap.cart.find(
                  (cartProduct) => cartProduct.id === data?.product.id
                )
              }
              width="100%"
            >
              {!!globalStoreSnap.cart.find(
                (cartProduct) => cartProduct.id === data?.product.id
              )
                ? "В корзине"
                : "Добавить в корзину"}
            </Button>
          </CardFooter>
        </Card>
      </Grid>
    </Flex>
  );
}
