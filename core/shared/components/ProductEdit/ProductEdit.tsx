import { useQuery } from "@apollo/client";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import { graphql } from "../../../../gql";
import {
  CreateProductArgs,
  Product,
  ProductAttribute,
  ProductInputAttribute,
} from "../../../../gql/graphql";
import { useForm } from "../../hooks/useForm";
import { formatBytes } from "../../utils/bytes";
import { randomId } from "../../utils/random";
import { UploadedImage } from "./UploadedImage/UploadedImage";

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

type ProductForm = { id: string } & CreateProductArgs;

type Props = {
  onSubmit: (
    product: ProductForm,
    attributes: ProductInputAttribute[],
    category: string
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

    setCategory(option.value);

    const attributes = data?.categories.find(
      (category) => category.name === option.label
    )?.attributes;

    if (attributes)
      setAttributes(
        attributes.map((attr) => ({
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

  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Grid
        gridTemplateColumns={isLargerThan970 ? "285px 1fr" : "1fr"}
        gap="32px"
      >
        <Box gap="32px">
          <Swiper>
            {(product?.covers?.length ? product?.covers : ["1"]).map(
              (cover) => (
                <SwiperSlide key={cover}>
                  <Image
                    alt="Product photo"
                    width="100%"
                    src={cover}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>

          <InputGroup>
            <InputLeftAddon>
              {formatBytes(
                form.covers?.reduce((acc, file) => acc + file.size, 0) ?? 0
              )}
            </InputLeftAddon>
            <Input
              value={
                (form.covers?.length ?? 0) > 1
                  ? `${form.covers?.length} файлов`
                  : form.covers?.[0]?.name ?? ""
              }
              onClick={() => inputFileRef.current?.click()}
              cursor="pointer"
              placeholder="Загрузить фото"
            />
          </InputGroup>

          <Input
            display="none"
            ref={inputFileRef}
            onChange={(event) => {
              if (event.target.files?.length)
                updateForm({ covers: Array.from(event.target.files) });
            }}
            type="file"
            multiple
          />

          <Box mt="32px">
            {form.covers?.map((cover) => (
              <UploadedImage
                onDelete={() => {
                  if (inputFileRef.current?.files?.length) {
                    const dataTransfer = new DataTransfer();

                    inputFileRef.current.files = dataTransfer.files;
                  }

                  updateForm({
                    covers: form.covers?.filter(
                      (oldCover) => oldCover.name !== cover.name
                    ),
                  });
                }}
                key={cover.name}
                src={URL.createObjectURL(cover)}
              />
            ))}
          </Box>
        </Box>

        <Flex flexGrow="1" flexDirection="column" gap="32px">
          <Grid
            gridTemplateColumns={isLargerThan970 ? "1fr auto 1fr" : "1fr"}
            alignItems="center"
            gap="16px"
          >
            <Select
              placeholder="Category"
              value={
                category ? { label: category, value: category } : undefined
              }
              onChange={(value) => onCategorySelect(value!)}
              options={data?.categories.map((category) => ({
                value: category.name,
                label: category.name,
              }))}
              isClearable
            />
            <span>or create</span>
            <Input placeholder="New category" />
          </Grid>
          <Input
            defaultValue={product?.name}
            onChange={(event) => updateForm({ name: event.target.value })}
            placeholder="Name"
          />
          <Input
            defaultValue={product?.price}
            onChange={(event) =>
              updateForm({ price: parseFloat(event.target.value) })
            }
            placeholder="Price"
          />
          <Grid
            gap="32px"
            flexDirection={isLargerThan970 ? "row" : "column"}
            gridTemplateColumns={isLargerThan970 ? "1fr 1fr" : "1fr"}
          >
            <Grid gridTemplateRows="auto 1fr" gap="32px" alignItems="stretch">
              <Heading>Description</Heading>
              <Textarea
                defaultValue={product?.description}
                onChange={(event) =>
                  updateForm({ description: event.target.value })
                }
                placeholder="Description"
                width="100%"
                rows={15}
              />
            </Grid>
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
                category
              )
            }
          >
            Save
          </Button>
        </Flex>
      </Grid>
    </>
  );
};
