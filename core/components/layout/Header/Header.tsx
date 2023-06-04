import ClientOnly from "../../ClientOnly";
import { Controls } from "./Controls/Controls";
import s from "./Header.module.scss";

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.content}>
        <span>HOLLOFABRIKA</span>

        <ClientOnly>
          <Controls />
        </ClientOnly>
      </div>
    </div>
  );
};

export default Header;
