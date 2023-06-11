import { useQuery } from "@apollo/client";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import Select from "react-select";
import { graphql } from "../../../../gql";
import { Product, ProductAttribute } from "../../../../gql/graphql";
import s from "../../../../pages/admin/products/product.module.scss";
import { useForm } from "../../hooks/useForm";
import { randomId } from "../../utils/random";

const Categories = graphql(`
  query ProductCategories {
    categories {
      name
      attributes {
        name
        value
      }
    }
  }
`);

type Attribute = { id: string } & ProductAttribute;

export const ProductEdit = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { data } = useQuery(Categories);

  const { form, updateForm } = useForm<Product>();

  const onCategorySelect = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => {
    const attributes = data?.categories.find(
      (category) => category.name === label
    )?.attributes;

    if (attributes)
      setAttributes(
        attributes.map((attr, index) => ({
          id: randomId(),
          name: attr?.name!,
          value: attr?.value!,
        }))
      );
  };

  const onAttributeKeyChange = (
    value: string,
    id: string,
    field: "name" | "value"
  ) => {
    const newAttributes = [...attributes];
    const editAttribute = newAttributes.find((attr) => attr.id === id);
    if (editAttribute) editAttribute[field] = value;

    setAttributes(newAttributes);
  };

  return (
    <>
      <Flex flexDirection={isLargerThan768 ? "row" : "column"} gap="32px">
        <div className={s.image}>
          <Image
            width="100%"
            src="gibbresh.png"
            fallbackSrc="https://via.placeholder.com/150"
          />
        </div>

        <Flex flexGrow="1" flexDirection="column" gap="32px">
          <Select
            onChange={(value) => onCategorySelect(value!)}
            options={data?.categories.map((category) => ({
              value: category.name,
              label: category.name,
            }))}
          />
          <Input
            onChange={(event) => updateForm({ name: event.target.value })}
            placeholder="Name"
          />
          <Input
            onChange={(event) =>
              updateForm({ price: parseFloat(event.target.value) })
            }
            placeholder="Price"
          />
          <Grid
            gap="32px"
            flexDirection={isLargerThan768 ? "row" : "column"}
            gridTemplateColumns={isLargerThan768 ? "1fr 1fr" : "1fr"}
          >
            <Flex flexGrow="1" flexDirection="column" gap="32px">
              <Heading>Attributes</Heading>
              {attributes?.map((attribute) => (
                <Flex key={attribute.id} alignItems="center" gap="8px">
                  <Input
                    defaultValue={attribute.name}
                    onChange={(event) =>
                      onAttributeKeyChange(
                        event.target.value,
                        attribute.id,
                        "name"
                      )
                    }
                    placeholder="Attribute"
                  />
                  :
                  <Input
                    onChange={(event) =>
                      onAttributeKeyChange(
                        event.target.value,
                        attribute.id,
                        "value"
                      )
                    }
                    placeholder="Value"
                  />
                  <Button
                    onClick={() =>
                      setAttributes((prev) =>
                        prev.filter((attr) => attr.id !== attribute.id)
                      )
                    }
                  >
                    <CloseIcon />
                  </Button>
                </Flex>
              ))}
              <Button
                onClick={() =>
                  setAttributes((prev) => [
                    ...prev,
                    { id: randomId(), name: "", value: "" },
                  ])
                }
              >
                Add
              </Button>
            </Flex>
            <Grid gridTemplateRows="auto 1fr" gap="32px">
              <Heading>Description</Heading>
              <Textarea
                style={{ width: "100%" }}
                onChange={(event) =>
                  updateForm({ description: event.target.value })
                }
                placeholder="Description"
                width={isLargerThan768 ? "50%" : "100%"}
                rows={-1}
              />
            </Grid>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};
