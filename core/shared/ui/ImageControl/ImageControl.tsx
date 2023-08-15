import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";
import classNames from "classnames";
import { FC } from "react";

import s from "./ImageControl.module.css";

type Props = {
  src: string;
  deleted?: boolean;
  onDelete?: () => void;
  onRestore?: () => void;
};

export const ImageControl: FC<Props> = ({
  src,
  onDelete,
  onRestore,
  deleted,
}) => {
  return (
    <Box className={s.container}>
      <div
        className={classNames(s.overlay, {
          [s.deleted]: deleted,
        })}
      />

      {src && (
        <div className={s.icon}>
          {deleted ? (
            <RepeatIcon onClick={onRestore} />
          ) : (
            <DeleteIcon onClick={onDelete} />
          )}
        </div>
      )}

      <Image
        src={src}
        fallbackSrc="https://via.placeholder.com/150"
        height="100%"
        width="100%"
      />
    </Box>
  );
};
