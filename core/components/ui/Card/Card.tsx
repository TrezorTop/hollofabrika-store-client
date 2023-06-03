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
import { FC, ReactNode, useState } from "react";
import s from "./Card.module.scss";

type Props = {
  title?: string;
  text?: string;
  subText?: string;
  buttons?: ReactNode;
  className?: string;
};

export const Card: FC<Props> = ({
  title,
  text,
  subText,
  buttons,
  className,
}) => {
  const [loaded, setLoaded] = useState<boolean>(true);

  return (
    <ChakraCard className={className}>
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
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
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
          <CardFooter>
            <ButtonGroup spacing="2">{buttons}</ButtonGroup>
          </CardFooter>
        </>
      )}
    </ChakraCard>
  );
};
