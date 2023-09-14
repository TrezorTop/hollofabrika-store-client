import { useCallback, useState } from "react";

export const useForm = <T>(defaultValues?: Partial<T>) => {
  const [form, setForm] = useState<T>((defaultValues ?? {}) as T);
  const [errors, setErrors] = useState<string[]>([]);

  const updateForm = useCallback((values: { [key in keyof T]?: T[key] }) => {
    setForm((prevForm) => ({ ...prevForm, ...values }));
    setErrors([]);
  }, []);

  const addError = (err: string) =>
    setErrors((prev) => [...new Set(prev.concat(err))]);

  const removeError = (err: string) =>
    setErrors((prev) => prev.filter((error) => error !== err));

  return {
    form,
    updateForm,
    errors,
    addError,
    removeError,
  };
};
