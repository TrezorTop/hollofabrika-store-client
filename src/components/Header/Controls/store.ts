import { proxy } from "valtio";

type Store = {
  login: string;
  password: string;
};

export const authStore = proxy<Store>({
  login: "",
  password: "",
});
