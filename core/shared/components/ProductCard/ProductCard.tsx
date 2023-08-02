import {
  Card as ChakraCard,
  CardBody,
  CardFooter,
  Divider,
  Fade,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC, ReactNode, useState } from "react";
import s from "./ProductCard.module.scss";

type Props = {
  title?: string;
  text?: string;
  subText?: string;
  cover?: string;

  onClick?: () => void;
  className?: string;
  buttons?: ReactNode;
};

export const ProductCard: FC<Props> = ({
  title,
  text,
  subText,
  cover,
  buttons,
  className,
  onClick,
}) => {
  const [loaded, setLoaded] = useState<boolean>(true);

  return (
    <ChakraCard className={className}>
      <CardBody className={s.card} onClick={onClick}>
        <div className={s.imageContainer}>
          <Fade in={!loaded}>
            <Skeleton
              className={s.skeleton}
              minHeight={100}
              width="100%"
              height="100%"
            />
          </Fade>
          <Fade in={loaded}>
            <Image
              onLoad={() => setLoaded(true)}
              src={cover}
              borderRadius="lg"
              maxHeight="30%"
            />
          </Fade>
        </div>
        <Stack mt="6" spacing="3">
          {title && <Heading size="md">{title}</Heading>}
          {text && <Text>{text}</Text>}
          {subText && (
            <Text color="blue.600" fontSize="2xl">
              {subText}
            </Text>
          )}
        </Stack>
      </CardBody>
      {buttons && (
        <>
          <Divider />
          <CardFooter flexDirection="column" gap='16px' justifyContent="center">
            {buttons}
          </CardFooter>
        </>
      )}
    </ChakraCard>
  );
};
