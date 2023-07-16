import { useQuery } from "@apollo/client";
import { Badge, Flex, Grid, Heading } from "@chakra-ui/react";
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
      <Grid gridTemplateColumns={"1fr 1fr"} gap={"32px"}>
        <div>{JSON.stringify(data?.product.covers)}</div>
        <Grid gridTemplateColumns={"1fr"}>
          {data?.product.attributes.map((attr) => (
            <div key={attr.name}>
              <Badge width="100%">{attr.name}:</Badge>
              <Badge>{attr.value}</Badge>
            </div>
          ))}
        </Grid>
      </Grid>
    </Flex>
  );
}
