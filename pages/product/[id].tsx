import { useQuery } from "@apollo/client";
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
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
      <Grid gridTemplateColumns={"1.5fr 1fr 0.75fr"} gap={"32px"}>
        <div>{JSON.stringify(data?.product.covers)}</div>
        <Flex flexDirection='column' gap='8px'>
          {data?.product.attributes.map((attr) => (
            <Badge key={attr.name}>
              <Text fontSize='sm'>{attr.name}: {attr.value}</Text>
            </Badge>
          ))}
        </Flex>
        <Card padding="16px" gap="16px">
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
