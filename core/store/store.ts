import { proxy } from "valtio";
import { Product, ProductsQuery } from "../../gql/graphql";

export const globalStore = proxy({
  account: null as null | string,
  cart: [] as Omit<Product, "attributes">[],
});

export const authStore = proxy({
  confirmToken: "",
});

export const adminStore = proxy({
  products: undefined as ProductsQuery["products"] | undefined,
});
