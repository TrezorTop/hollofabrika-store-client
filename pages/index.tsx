import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import Select from "react-select";
import { Card } from "../core/shared/components/Card/Card";
import { graphql } from "../gql";
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
        value
        count
      }
    }
  }
`);

const Home = () => {
  const { data: productsData } = useQuery(Products);
  const { data: categoriesData } = useQuery(Categories);

  return (
    <div className={s.home}>
      <Flex className={s.controls}>
        <Select
          options={categoriesData?.categories.map((category) => ({
            value: category.name,
            label: category.name,
          }))}
          placeholder="Category"
        />
      </Flex>

      {productsData?.products.items.map((product) => (
        <Card key={product.id} />
      ))}
    </div>
  );
};

export default Home;
