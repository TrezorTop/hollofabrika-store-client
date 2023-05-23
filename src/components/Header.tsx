import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <Link href="/">Home</Link>&nbsp;
      <Link href="item">ITEM</Link>
    </header>
  );
};
