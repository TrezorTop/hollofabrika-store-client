import { useCallback, useState } from "react";

export const useForm = <T>(defaultValues?: Partial<T>) => {
  const [form, setForm] = useState<T>((defaultValues ?? {}) as T);
  const [error, setError] = useState<string | undefined>("");

  const updateForm = useCallback((values: { [key in keyof T]?: T[key] }) => {
    setForm((prevForm) => ({ ...prevForm, ...values }));
    setError("");
  }, []);

  return {
    form,
    updateForm,
    error,
    setError,
  };
};
