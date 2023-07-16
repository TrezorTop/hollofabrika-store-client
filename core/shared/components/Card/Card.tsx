import {
  ButtonGroup,
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
import classNames from "classnames";
import { FC, ReactNode, useState } from "react";
import s from "./Card.module.scss";

type Props = {
  title?: string;
  text?: string;
  subText?: string;
  cover?: string;

  onClick?: () => void;
  className?: string;
  buttons?: ReactNode;
};

export const Card: FC<Props> = ({
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
    <ChakraCard onClick={onClick} className={classNames(s.card, className)}>
      <CardBody>
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
          <CardFooter justifyContent="end">
            <ButtonGroup spacing="2">{buttons}</ButtonGroup>
          </CardFooter>
        </>
      )}
    </ChakraCard>
  );
};
