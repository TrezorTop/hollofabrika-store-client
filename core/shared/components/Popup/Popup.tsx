import {
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

import s from "./Popup.module.scss";

type Props = {
  children: ReactNode;
  header?: ReactNode;
  body: ReactNode;

  closeButton?: boolean;
};

export const Popup: FC<Props> = ({ body, children, header, closeButton }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex alignItems="center">{children}</Flex>
      </PopoverTrigger>
      <PopoverContent className={s.popup}>
        <PopoverArrow />
        {closeButton && <PopoverCloseButton />}
        {header && (
          <PopoverHeader>
            <Heading size="md">{header}</Heading>
          </PopoverHeader>
        )}
        <PopoverBody>{body}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
