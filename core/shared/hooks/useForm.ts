import { useCallback, useState } from "react";

export const useForm = <T>(defaultValues?: T) => {
  const [form, setForm] = useState<T>((defaultValues ?? {}) as T);
  const [errors, setErrors] = useState<string[]>([]);

  const updateForm = useCallback((values: { [key in keyof T]?: T[key] }) => {
    setForm((prevForm) => ({ ...prevForm, ...values }));
    setErrors([]);
  }, []);

  return {
    form,
    updateForm,
    errors,
    setErrors,
  };
};
