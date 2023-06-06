import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement, ReactNode, useMemo, useState } from "react";

import s from "./layout.module.scss";

const baseRoute = "/admin/";

const NestedLayout = ({ children }: { children: ReactNode }) => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const [isLessThan570] = useMediaQuery("(max-width: 570px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const links: { title: string; href: string }[] = useMemo(() => {
    return [
      { title: "Admin", href: baseRoute },
      { title: "Products", href: baseRoute + "products" },
    ];
  }, []);

  return (
    <div>
      {isLessThan570 ? (
        <>
          <div className={s.drawerButton}>
            <Button onClick={() => setSidebar(true)}>
              <ChevronRightIcon>test</ChevronRightIcon>
            </Button>
          </div>
          <Drawer
            placement="left"
            onClose={() => setSidebar(false)}
            isOpen={sidebar}
            size={"full"}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton onClick={() => setSidebar(false)} />
              <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
              <DrawerBody padding="32px">
                <Flex flexDirection="column" gap="16px">
                  {links.map(({ title, href }) => (
                    <Link
                      key={href}
                      as={NextLink}
                      href={href}
                      onClick={() => setSidebar(false)}
                    >
                      {title}
                    </Link>
                  ))}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          {children}
        </>
      ) : (
        <Flex gap="24px">
          <Flex flexDirection="column" gap="16px">
            {links.map(({ title, href }) => (
              <Link key={href} as={NextLink} href={href}>
                {title}
              </Link>
            ))}
          </Flex>
          <Center>
            <Divider orientation="vertical" />
          </Center>
          <Box width="100%">{children}</Box>
        </Flex>
      )}
    </div>
  );
};

export const AdminLayout = (page: ReactElement) => (
  <NestedLayout>{page}</NestedLayout>
);
