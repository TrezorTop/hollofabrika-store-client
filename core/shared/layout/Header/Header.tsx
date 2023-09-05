import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import ClientOnly from "../../ClientOnly";
import { Controls } from "./Controls/Controls";
import s from "./Header.module.scss";

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.content}>
        <Link as={NextLink} href="/">
          <span className={s.title}>HOLLOFABRIKA</span>
          <span className={s.back}>На главную</span>
        </Link>

        <ClientOnly>
          <Controls />
        </ClientOnly>
      </div>
    </div>
  );
};

export default Header;
