import { Controls } from "./Controls/Controls";
import s from "./Header.module.css";
import ClientOnly from "@core/components/ClientOnly";

const Header = () => {
  return (
    <div className={s.header}>
      <span>HOLLOFABRIKA</span>

      <ClientOnly>
        <Controls />
      </ClientOnly>
    </div>
  );
};

export default Header;
