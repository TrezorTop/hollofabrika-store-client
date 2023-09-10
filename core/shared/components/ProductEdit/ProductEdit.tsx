import { useQuery } from "@apollo/client";
import { CloseIcon, DeleteIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import { graphql } from "../../../../gql";
import {
  CreateProductArgs,
  Product,
  ProductAttribute,
  ProductInputAttribute,
  UpdateProductArgs,
} from "../../../../gql/graphql";
import { useForm } from "../../hooks/useForm";
import { randomId } from "../../utils/random";

const allowedImameTypes = ["image/jpeg", "image/jpg", "image/png"];

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

type ProductForm = { id: string; newCategory: string } & CreateProductArgs &
  UpdateProductArgs;

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
      <Grid gridTemplateColumns="320px 3fr" gap={8}>
        <Stack gap={8}>
          {product?.covers?.length ? (
            <Card height="fit-content">
              <CardBody>
                <Swiper centeredSlides={true}>
                  {product?.covers?.map((cover) => (
                    <SwiperSlide key={cover}>
                      <Flex>
                        <Image src={cover} margin={"0 auto"} width="100%" />
                      </Flex>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </CardBody>
            </Card>
          ) : (
            <Card height="fit-content">
              <CardBody>
                <Text textAlign={"center"} fontSize="3xl">
                  Товар без фото
                </Text>
              </CardBody>
            </Card>
          )}

          {!!product?.covers?.length && (
            <>
              <Text fontSize="xl">Фото товара:</Text>
              <Stack>
                {product.covers?.map((cover) => {
                  const deleted = !!form.coversNamesToDelete?.find((c) => c === cover);

                  console.log(form.coversNamesToDelete)

                  return (
                    <Card
                      key={cover}
                      border={deleted ? "1px solid red" : "unset"}
                    >
                      <CardBody
                        padding={4}
                        display="flex"
                        gap={4}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Flex gap={4} alignItems="center">
                          <Image maxWidth="100px" src={cover} />

                          {deleted && <>Фото будет удалено</>}
                        </Flex>

                        <IconButton
                          aria-label={"Delete"}
                          icon={deleted ? <RepeatClockIcon /> : <DeleteIcon />}
                          onClick={() =>
                            deleted
                              ? updateForm({
                                  coversNamesToDelete:
                                    form.coversNamesToDelete?.filter(
                                      (c) => c !== cover
                                    ),
                                })
                              : updateForm({
                                  coversNamesToDelete:
                                    (form.coversNamesToDelete ?? []).concat(cover),
                                })
                          }
                        />
                      </CardBody>
                    </Card>
                  );
                })}
              </Stack>
            </>
          )}

          <Dropzone
            accept={{
              "image/jpeg": [".jpeg", ".png", ".jpg"],
            }}
            onDrop={(acceptedFiles) => {
              updateForm({
                covers: acceptedFiles.filter((file) => {
                  return allowedImameTypes.includes(file.type);
                }),
              });
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Card {...getRootProps()} cursor="pointer" height="200px">
                <CardBody
                  display="flex"
                  justifyContent="center"
                  border="3px dashed gray"
                  alignItems="center"
                >
                  <input
                    {...getInputProps({
                      accept: "image/png, image/jpg",
                    })}
                  />
                  <Text textAlign="center" fontSize="lg">
                    Кликните или перетащите файлы сюда для загрузки картинок
                    {!!form.covers?.length && (
                      <>
                        <br />
                        Файлов загружено: {form.covers?.length}{" "}
                      </>
                    )}
                  </Text>
                </CardBody>
              </Card>
            )}
          </Dropzone>

          {!!form.covers?.length && (
            <>
              <Text fontSize="xl">Загруженные файлы:</Text>
              <Stack>
                {form.covers?.map((cover) => (
                  <Card key={cover.name}>
                    <CardBody
                      padding={4}
                      display="flex"
                      gap={4}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Flex gap={4} alignItems="center">
                        <Image
                          maxWidth="100px"
                          src={URL.createObjectURL(cover)}
                        />{" "}
                        <Text fontSize="xl">{cover.name}</Text>
                      </Flex>
                      <IconButton
                        aria-label={"Delete"}
                        icon={<DeleteIcon />}
                        onClick={() =>
                          updateForm({
                            covers: form.covers?.filter(
                              (c) => c.name !== cover.name
                            ),
                          })
                        }
                      />
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </>
          )}
        </Stack>

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
                    placeholder="Имя атрибута"
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
                    placeholder="Значение атрибута"
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
