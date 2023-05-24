"use client";

import { store } from "@/lib/store";
import { useSnapshot } from "valtio";
import s from "./Controls.module.css";

export const Controls = () => {
  const snap = useSnapshot(store);

  return (
    <div className={s.controls}>
      <div>{snap.account}</div>
      <div>Cart</div>
    </div>
  );
};
