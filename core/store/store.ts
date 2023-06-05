import { proxy } from "valtio";

export const authStore = proxy({
  confirmToken: "",

  login: "",
  email: "",
  password: "",
  code: "",
});
