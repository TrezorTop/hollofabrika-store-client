import { Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

export const ConfirmOrder = () => {
  const [code, setCode] = useState<string>("");

  return (
    <Flex direction="column" gap="16px" padding="16px">
      <Input
        onChange={(event) => setCode(event.target.value)}
        placeholder="Код заказа"
      />
    </Flex>
  );
};
