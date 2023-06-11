import { useState } from "react";

export const useForm = <T>(defaultValues?: T) => {
  const [form, setForm] = useState<T>(defaultValues!);
  const [error, setError] = useState<string | undefined>("");

  const updateForm = (values: { [key in keyof T]?: T[key] }) => {
    setForm({ ...form, ...values });
    setError("");
  };

  return {
    form,
    updateForm,
    error,
    setError,
  };
};
