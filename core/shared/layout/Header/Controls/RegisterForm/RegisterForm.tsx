import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../../gql";
import { authStore } from "../../../../../store/store";
import { useForm } from "../../../../hooks/useForm";

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

  const { form, updateForm } = useForm<Form>({
    email: "",
    login: "",
    password: "",
    repeatedPassword: "",
    code: "",
  });

  const [
    register,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation(RegisterMutation, {
    variables: {
      email: form.email,
      username: form.login,
      password: form.password,
    },
  });

  const [
    confirm,
    { data: confirmData, loading: confirmLoading, error: confirmError },
  ] = useMutation(ConfirmMutation, {
    variables: {
      emailToken: form.code,
    },
  });

  useEffect(() => {
    if (registerData?.register?.code) {
      authStore.confirmToken = registerData?.register?.code;
      setStep(Step.Confirm);
    }
  }, [registerData]);

  useEffect(() => {
    if (confirmData?.verifyEmail?.code == "Oke") onSuccess();
  }, [confirmData, onSuccess]);

  return (
    <>
      <Input
        onChange={(event) => updateForm({ email: event.target.value })}
        placeholder="Email"
        disabled={step === Step.Confirm}
      />
      <Input
        onChange={(event) => updateForm({ login: event.target.value })}
        placeholder="Login"
        disabled={step === Step.Confirm}
      />
      <Input
        onChange={(event) => updateForm({ password: event.target.value })}
        placeholder="Password"
        disabled={step === Step.Confirm}
      />
      <Input disabled={step === Step.Confirm} placeholder="Repeat Password" />
      {step === Step.Confirm && (
        <Input
          placeholder="Code"
          onChange={(event) => updateForm({ code: event.target.value })}
        />
      )}

      {step === Step.Confirm && (
        <Button variant="link" onClick={() => setStep(Step.Register)}>
          cancel
        </Button>
      )}

      <Button onClick={() => (step === Step.Register ? register() : confirm())}>
        {step === Step.Register ? "Register" : "ConfirmMutation Code"}
      </Button>
      <Button onClick={onCancel} variant="link">
        Назад
      </Button>
    </>
  );
};
