import { Controls } from "@/components/Header/Controls/Controls";
import s from "./Header.module.css";

export const Header = () => {
  return (
    <header className={s.header}>
      <h1>HOLLOFABRIKA</h1>

      <Controls />
    </header>
  );
};
