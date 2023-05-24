import { ReactNode } from "react";

import s from "./Main.module.css";

type TProps = {
  children: ReactNode;
};

export const Main = ({ children }: TProps) => {
  return <main className={s.main}>{children}</main>;
};
