import { useQuery } from "@apollo/client";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { graphql } from "../../gql";

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

  const { data } = useQuery(ProductQuery, {
    variables: {
      id: router.query.id as string,
    },
  });

  return (
    <Flex flexDirection="column" gap={"32px"}>
      <Heading>{data?.product.name}</Heading>
      <Grid gridTemplateColumns={"500px 1fr 0.5fr"} gap={"64px"}>
        <Box>
          <Swiper>
            {data?.product.covers?.map((cover) => (
              <SwiperSlide key={cover}>
                <Image src={cover} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Flex flexDirection="column" gap="8px">
          {data?.product.attributes.map((attr) => (
            <Badge key={attr.name}>
              <Text fontSize="sm">
                {attr.name}: {attr.value}
              </Text>
            </Badge>
          ))}
        </Flex>
        <Card padding="16px" gap="16px" height='fit-content'>
          <Text textAlign="end" fontSize="xl">
            {Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
            }).format(data?.product.price ?? 0)}
          </Text>
          <Button>Добавить в корзину</Button>
        </Card>
      </Grid>
    </Flex>
  );
}
