import { Badge, Button, Flex, Link } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useSnapshot } from "valtio";
import { globalStore } from "../../../../../store/store";

import s from "./Cart.module.css";

export const Cart: FC = () => {
  const [code, setCode] = useState<string>("");
  const snap = useSnapshot(globalStore);

  return (
    <Flex direction="column" gap="16px" padding="16px">
      {snap.cart.map((product) => (
        <Flex
          key={product.id}
          flexDirection="column"
          gap="8px"
          className={s.product}
        >
          <Flex
            gap="8px"
            justifyContent="space-between"
            alignItems="center"
            key={product.id}
          >
            <Link>{product.name}</Link>
            <Badge>
              {Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
              }).format(product.price)}
            </Badge>
          </Flex>

          <Button
            size="sm"
            onClick={() => {
              globalStore.cart = globalStore.cart.filter(
                (cartProduct) => cartProduct.id !== product.id
              );
            }}
          >
            Удалить
          </Button>
        </Flex>
      ))}
      <Button isDisabled={!snap.cart.length} onClick={() => setCode("123456")}>
        Получить код
      </Button>
      {code && (
        <Badge textAlign="center" fontSize="4xl" variant="outline">
          {code}
        </Badge>
      )}
    </Flex>
  );
};
