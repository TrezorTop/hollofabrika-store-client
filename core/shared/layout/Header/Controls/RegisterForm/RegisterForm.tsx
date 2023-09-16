import { useMutation } from "@apollo/client";
import { Button, Input, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../../gql";
import { authStore } from "../../../../../store/store";
import { useForm } from "../../../../hooks/useForm";
import { ErrorText } from "../../../../ui/ErrorText/ErrorText";
import { isEmail } from "../../../../utils/string";

const RegisterMutation = graphql(`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      code
    }
  }
`);

const ConfirmMutation = graphql(`
  mutation Confirm($emailToken: String!) {
    verifyEmail(emailToken: $emailToken) {
      code
    }
  }
`);

enum Step {
  Register,
  Confirm,
}

type Form = {
  email: string;
  login: string;
  password: string;
  repeatedPassword: string;
  code: string;
};

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

export const RegisterForm = ({ onSuccess, onCancel }: Props) => {
  const [step, setStep] = useState<Step>(Step.Register);

  const snap = useSnapshot(authStore);

  const toast = useToast();

  const { form, updateForm, errors, addError } = useForm<Form>({
    email: "",
    login: "",
    password: "",
    repeatedPassword: "",
    code: "",
  });

  const [register, { data: registerData, loading: registerLoading }] =
    useMutation(RegisterMutation, {
      variables: {
        email: form.email,
        username: form.login,
        password: form.password,
      },
      onError: (error) => {
        addError(error.message);
      },
    });

  const [confirm, { data: confirmData, loading: confirmLoading }] = useMutation(
    ConfirmMutation,
    {
      variables: {
        emailToken: form.code,
      },
      onError: (error) => {
        addError(error.message);
      },
      onCompleted: () => {
        toast({
          title: "Успешно",
          description: "Теперь вы можете зайти в свой аккаунт",
          status: "success",
        });
      },
    }
  );

  useEffect(() => {
    if (registerData?.register?.code) {
      authStore.confirmToken = registerData?.register?.code;
      setStep(Step.Confirm);
    }
  }, [registerData]);

  useEffect(() => {
    if (confirmData?.verifyEmail?.code == "Oke") onSuccess();
  }, [confirmData, onSuccess]);

  const isValid = () => {
    if (step === Step.Register) {
      if (!form.email || !isEmail(form.email)) return false;
      if (!form.login) return false;
      if (!form.password) return false;
      if (form.repeatedPassword !== form.password) return false;

      return true;
    }

    if (step === Step.Confirm) {
      if (!form.code) return false;

      return true;
    }

    return true;
  };

  return (
    <>
      <Input
        onChange={(event) => updateForm({ email: event.target.value })}
        placeholder="Email"
        disabled={step === Step.Confirm}
      />
      <Input
        onChange={(event) => updateForm({ login: event.target.value })}
        placeholder="Логин"
        disabled={step === Step.Confirm}
      />
      <Input
        onChange={(event) => updateForm({ password: event.target.value })}
        type="password"
        placeholder="Пароль"
        disabled={step === Step.Confirm}
      />
      <Input
        disabled={step === Step.Confirm}
        type="password"
        placeholder="Повторите пароль"
        onChange={(event) =>
          updateForm({ repeatedPassword: event.target.value })
        }
      />
      {step === Step.Confirm && (
        <>
          <Text textAlign="center">Код был отправлен на вашу почту</Text>

          <Input
            placeholder="Код подтверждения"
            onChange={(event) => updateForm({ code: event.target.value })}
          />
        </>
      )}

      {step === Step.Confirm && (
        <Button variant="link" onClick={() => setStep(Step.Register)}>
          Ввести другие данные
        </Button>
      )}

      {form.repeatedPassword && form.repeatedPassword !== form.password && (
        <ErrorText>Пароли должны совпадать</ErrorText>
      )}
      {form.email && !isEmail(form.email) && (
        <ErrorText>Неверный email</ErrorText>
      )}

      {errors.map((error) => (
        <ErrorText key={error} error={error} />
      ))}

      <Button
        isDisabled={!isValid() || registerLoading || confirmLoading}
        onClick={() => {
          if (step === Step.Register) {
            toast({
              title: "Подтверждение почты",
              description: "Скоро вам на почту придёт письмо с кодом",
              status: "loading",
            });
            register();
          } else {
            confirm();
          }
        }}
      >
        {step === Step.Register ? "Зарегистрироваться" : "Подтвердить код"}
      </Button>
      <Button onClick={onCancel} variant="link">
        Назад
      </Button>
    </>
  );
};
