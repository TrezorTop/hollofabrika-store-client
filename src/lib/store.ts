import { proxy } from "valtio";

type Store = {
  account: string;
};

export const store = proxy<Store>({
  account: "user",
});
