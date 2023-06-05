import { NextPage } from "next";
import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

import s from "./Layout.module.scss";

type Props = {
  children: ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
