import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "../../../../../../gql";
import { authStore } from "../../../../../store/store";
import { useForm } from "../../../../hooks/useForm";

const Register = graphql(`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      confirmToken
    }
  }
`);

const Confirm = graphql(`
  mutation Confirm($confirmToken: String!, $emailToken: Int!) {
    verifyEmail(confirmToken: $confirmToken, emailToken: $emailToken) {
      code
    }
  }
`);

type Props = {
  onSuccess: () => void;
};

enum Step {
  Register,
  Confirm,
}

export const RegisterForm = ({ onSuccess }: Props) => {
  const [step, setStep] = useState<Step>(Step.Register);

  const snap = useSnapshot(authStore);

  const { form, updateForm } = useForm<{
    email: string;
    login: string;
    password: string;
    repeatedPassword: string;
    code: string;
  }>();

  const [
    register,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation(Register, {
    variables: {
      email: form.email,
      username: form.login,
      password: form.password,
    },
  });

  const [
    confirm,
    { data: confirmData, loading: confirmLoading, error: confirmError },
  ] = useMutation(Confirm, {
    variables: {
      emailToken: +snap.code,
      confirmToken: snap.confirmToken,
    },
  });

  useEffect(() => {
    if (registerData?.register?.confirmToken) {
      authStore.confirmToken = registerData?.register?.confirmToken;
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
        {step === Step.Register ? "Register" : "Confirm Code"}
      </Button>
      <Button variant="link">Login</Button>
    </>
  );
};
