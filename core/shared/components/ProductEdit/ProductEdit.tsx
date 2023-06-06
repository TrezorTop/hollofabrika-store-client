import { Flex, Image, Input, Textarea, useMediaQuery } from "@chakra-ui/react";
import s from "../../../../pages/admin/products/product.module.scss";

export const ProductEdit = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  return (
    <>
      <Flex flexDirection={isLargerThan768 ? "row" : "column"} gap="32px">
        <div className={s.image}>
          <Image
            width="100%"
            src="gibbresh.png"
            fallbackSrc="https://via.placeholder.com/150"
          />
        </div>

        <Flex flexGrow="1" flexDirection="column" gap="32px">
          <Input />
          <Input />
          <Input />
          <Input />
        </Flex>
      </Flex>
      <Flex gap="32px" flexDirection={isLargerThan768 ? "row" : "column"}>
        <Flex flexGrow="1" flexDirection="column" gap="32px">
          <Input />
          <Input />
          <Input />
          <Input />
        </Flex>
        <Textarea width={isLargerThan768 ? "50%" : "100%"} />
      </Flex>
    </>
  );
};
