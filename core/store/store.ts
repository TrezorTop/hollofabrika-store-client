import { proxy } from "valtio";
import { ProductsQuery } from "../../gql/graphql";

export const globalStore = proxy({
  account: null as null | string,
});

export const authStore = proxy({
  confirmToken: "",

  login: "",
  email: "",
  password: "",
  code: "",
});

export const adminStore = proxy({
  products: undefined as ProductsQuery["products"] | undefined,
});
