import { CloseIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";
import { FC } from "react";

import s from "./UploadedImage.module.css";

type Props = {
  src: string;
  onDelete?: () => void;
};

export const UploadedImage: FC<Props> = ({ src, onDelete }) => {
  return (
    <Box className={s.container}>
      <div className={s.overlay} />
      <CloseIcon onClick={onDelete} className={s.icon} />

      <Image src={src} />
    </Box>
  );
};
