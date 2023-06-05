import {
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
};

export const Popup: FC<Props> = ({ body, children, header }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className={s.popup}>
        <PopoverArrow />
        <PopoverCloseButton />
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
