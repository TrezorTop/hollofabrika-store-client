import { Providers } from "@/app/providers";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Main } from "@/components/Main/Main";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "HOLLOFABRIKA",
  description: "Hollofabrika is a store app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
