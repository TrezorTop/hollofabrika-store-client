import { proxy } from "valtio";
import { Product, Role } from "../../gql/graphql";

export const globalStore = proxy({
  account: null as {
    username: string;
    role: Role;
  } | null,
  cart: [] as Omit<Product, "attributes">[],
});

export const authStore = proxy({
  confirmToken: "",
});

// export const adminStore = proxy({
//   products: undefined as ProductsQuery["products"] | undefined,
// });
