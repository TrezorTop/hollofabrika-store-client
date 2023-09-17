import { useMutation } from "@apollo/client";
import { Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { FC, useMemo, useState } from "react";
import { graphql } from "../../../../../../gql";
import { useForm } from "../../../../hooks/useForm";
import { ErrorText } from "../../../../ui/ErrorText/ErrorText";
import { isEmail } from "../../../../utils/string";

type Props = {
  onCancel: () => void;
  onSuccess: () => void;
};

type Form = {
  email: string;
  password: string;
  repeatedPassword: string;
  code: string;
};

const RequestResetPassword = graphql(`
  mutation requestResetPassword($email: String!) {
    requestResetPassword(email: $email) {
      code
    }
  }
`);

const ConfirmResetPassword = graphql(`
  mutation confirmResetPassword($token: String!, $password: String!) {
    confirmResetPassword(token: $token, password: $password) {
      code
    }
  }
`);

enum Step {
  Request,
  Confirm,
}

export const ResetForm: FC<Props> = ({ onSuccess, onCancel }) => {
  const [step, setStep] = useState<Step>(Step.Request);

  const { form, updateForm, errors, addError } = useForm<Form>();

  const [requestReset, { loading }] = useMutation(RequestResetPassword);
  const [confirmReset, { loading: confirmLoading }] =
    useMutation(ConfirmResetPassword);

  const isValid = useMemo(() => {
    if (step === Step.Request) {
      if (!form.email || !isEmail(form.email)) return false;
    }
    if (step === Step.Confirm) {
      if (!form.code) return false;
      if (!form.password) return false;
      if (form.repeatedPassword !== form.password) return false;
    }

    return true;
  }, [form.code, form.email, form.password, form.repeatedPassword, step]);

  const toast = useToast();

  return (
    <>
      <Heading textAlign="center" size="md">
        Сброс пароля
      </Heading>

      <Text textAlign="center">
        Укажите почту, которую использовали при регистрации
      </Text>

      <Input
        isDisabled={step === Step.Confirm}
        onChange={(event) => updateForm({ email: event.target.value })}
        placeholder="Email"
      />

      {step === Step.Confirm && (
        <>
          <Input
            type="password"
            onChange={(event) => updateForm({ password: event.target.value })}
            placeholder="Новый пароль"
          />

          <Input
            type="password"
            onChange={(event) =>
              updateForm({ repeatedPassword: event.target.value })
            }
            placeholder="Повторите новый пароль"
          />

          <Text textAlign="center">Код был отправлен на вашу почту</Text>

          <Input
            onChange={(event) => updateForm({ code: event.target.value })}
            placeholder="Код подтверждения"
          />
        </>
      )}

      {form.email && !isEmail(form.email) && (
        <ErrorText>Неверный email</ErrorText>
      )}
      {form.repeatedPassword && form.repeatedPassword !== form.password && (
        <ErrorText>Пароли должны совпадать</ErrorText>
      )}
      {errors.map((error) => (
        <ErrorText key={error} error={error} />
      ))}

      <Button
        isDisabled={!isValid || loading}
        variant="outline"
        onClick={() => {
          if (step === Step.Request) {
            toast({
              title: "Подтверждение почты",
              description: "Если данный email есть в системе, на него скоро придёт письмо с кодом",
              status: "loading",
            });

            requestReset({
              variables: {
                email: form.email,
              },
              onCompleted: (data) => {
                setStep(Step.Confirm);
                toast({
                  title: "Подтверждение",
                  description: "Письмо с кодом пришло вам на почту",
                  status: "success",
                });
              },
              onError: (error) => {
                addError(error.message);
                toast({
                  title: "Ошибка",
                  description: "Аккаунта с данным email не существует",
                  status: "error",
                });
              },
            });
          }

          if (step === Step.Confirm) {
            confirmReset({
              variables: {
                token: form.code,
                password: form.password,
              },
              onCompleted: () => {
                toast({
                  title: "Успешно",
                  description: "Пароль успешно сброшен",
                  status: "success",
                });

                onSuccess();
              },
              onError: (error) => {
                addError(error.message);
              },
            });
          }
        }}
      >
        {step === Step.Request ? "Восстановить пароль" : "Изменить пароль"}
      </Button>

      <Button
        onClick={() => {
          if (step === Step.Confirm) {
            updateForm({
              code: "",
              password: "",
              repeatedPassword: "",
            });

            setStep(Step.Request);
          } else {
            onCancel();
          }
        }}
        variant="link"
      >
        Назад
      </Button>
    </>
  );
};
