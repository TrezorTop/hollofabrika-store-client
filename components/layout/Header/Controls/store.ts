import { proxy } from "valtio";

export const authStore = proxy({
  login: "",
  email: "",
  password: "",
});
