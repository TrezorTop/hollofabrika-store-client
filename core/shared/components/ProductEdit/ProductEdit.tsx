import { useQuery } from "@apollo/client";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { graphql } from "../../../../gql";
import {
  CreateProductArgs,
  Product,
  ProductAttribute,
  ProductInputAttribute,
} from "../../../../gql/graphql";
import { useForm } from "../../hooks/useForm";
import { randomId } from "../../utils/random";

const Categories = graphql(`
  query ProductCategories {
    categories {
      name
      attributes {
        name
      }
    }
  }
`);

type Attribute = { id: string } & ProductAttribute;

type ProductForm = { id: string; newCategory: string } & CreateProductArgs;

type Props = {
  onSubmit: (
    product: ProductForm,
    attributes: ProductInputAttribute[],
    category: string | undefined
  ) => void;
  product?: Product;
};

export const ProductEdit = ({ onSubmit, product }: Props) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [category, setCategory] = useState<string>("");

  const [isLargerThan970] = useMediaQuery("(min-width: 970px)");
  const { data } = useQuery(Categories);
  const { form, updateForm } = useForm<ProductForm>();

  useEffect(() => {
    if (product?.attributes)
      setAttributes(
        product.attributes.map((attr) => ({
          id: randomId(),
          name: attr.name!,
          value: attr.value!,
        }))
      );

    if (product?.category) setCategory(product.category);

    if (product?.id) updateForm({ id: product.id });
  }, [setAttributes, updateForm, product]);

  const onCategorySelect = (option: { value: string; label: string }) => {
    if (!option) return;

    updateForm({ newCategory: "" });
    setCategory(option.value);

    const attributes =
      data?.categories.find((category) => category.name === option.label)
        ?.attributes ?? [];

    setAttributes(
      attributes.map((attr) => ({
        id: randomId(),
        name: attr?.name!,
        value: "",
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
      <Grid gridTemplateColumns="1fr 3fr" gap="32px">
        <Flex gap="32px">

        </Flex>

        <Flex flexGrow="1" flexDirection="column" gap="32px">
          <Heading>Информация</Heading>
          <Select
            placeholder="Category"
            value={
              category
                ? { label: category, value: category }
                : { value: "", label: "Создать новую категорию" }
            }
            onChange={(value) => onCategorySelect(value!)}
            options={data?.categories
              .map((category) => ({
                value: category.name,
                label: category.name,
              }))
              .concat({ value: "", label: "Создать новую категорию" })}
          />
          {!category && (
            <Input
              onChange={(event) =>
                updateForm({ newCategory: event.target.value })
              }
              placeholder="Категория"
            />
          )}
          <Input
            defaultValue={product?.name}
            onChange={(event) => updateForm({ name: event.target.value })}
            placeholder="Имя"
          />
          <InputGroup>
            <NumberInput defaultValue={product?.price}>
              <NumberInputField
                placeholder="Цена в рублях"
                onChange={(event) =>
                  updateForm({ price: parseFloat(event.target.value) })
                }
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <InputRightAddon>РУБ</InputRightAddon>
          </InputGroup>
          <Grid
            gap="32px"
            flexDirection={isLargerThan970 ? "row" : "column"}
            gridTemplateColumns={isLargerThan970 ? "1fr 1fr" : "1fr"}
          >
            <Grid gridTemplateRows="auto 1fr" gap="32px" alignItems="stretch">
              <Heading>Описание</Heading>
              <Textarea
                defaultValue={product?.description}
                onChange={(event) =>
                  updateForm({ description: event.target.value })
                }
                placeholder="Описание"
                width="100%"
                rows={15}
              />
            </Grid>
            <Flex flexGrow="1" flexDirection="column" gap="32px">
              <Heading>Аттрибуты</Heading>
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
                    defaultValue={attribute.value}
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
          </Grid>
          <Button
            onClick={() =>
              onSubmit(
                form,
                attributes.map((attr) => ({
                  value: attr.value,
                  name: attr.name,
                })),
                category === product?.category ? undefined : category
              )
            }
          >
            Сохранить
          </Button>
        </Flex>
      </Grid>
    </>
  );
};
