import { proxy } from "valtio";

type Store = {
  account: string;
};

export const globalStore = proxy<Store>({
  account: "user",
});
