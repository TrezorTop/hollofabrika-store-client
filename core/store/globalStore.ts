import { proxy } from "valtio";

export const globalStore = proxy({
  account: "user",
});
