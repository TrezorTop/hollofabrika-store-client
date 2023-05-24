"use client";

import { store } from "@/lib/store";
import { Button } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import s from "./Controls.module.css";

export const Controls = () => {
  const snap = useSnapshot(store);

  return (
    <div className={s.controls}>
      <Button onClick={() => (store.account = "123")}>Test</Button>
      <div>{snap.account}</div>
      <div>Cart</div>
    </div>
  );
};
