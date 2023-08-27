import React, { FC, FormHTMLAttributes, ReactNode, useRef } from "react";
import { useEventListener } from "usehooks-ts";

import s from "./Form.module.css";

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

export const Form: FC<IFormProps> = ({ children, className, ...props }) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEventListener(
    "submit",
    (event) => {
      event.preventDefault();
    },
    formRef
  );

  return (
    <form className={s.form} {...props}>
      {children}
    </form>
  );
};
