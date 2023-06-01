import { proxy } from "valtio";

export const globalStore = proxy({
  account: null as null | string,
});
