import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { graphql } from "@gql/gql";
import { authStore } from "@core/components/layout/Header/Controls/store";

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

  const [
    register,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation(Register, {
    variables: {
      email: snap.email,
      username: snap.login,
      password: snap.password,
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
  }, [confirmData]);

  return (
    <>
      <Input
        defaultValue={snap.email}
        onChange={(event) => (authStore.email = event.target.value)}
        placeholder="Email"
        disabled={step === Step.Confirm}
      />
      <Input
        defaultValue={snap.login}
        onChange={(event) => (authStore.login = event.target.value)}
        placeholder="Login"
        disabled={step === Step.Confirm}
      />
      <Input
        defaultValue={snap.password}
        onChange={(event) => (authStore.password = event.target.value)}
        placeholder="Password"
        disabled={step === Step.Confirm}
      />
      <Input disabled={step === Step.Confirm} placeholder="Repeat Password" />
      {step === Step.Confirm && (
        <Input
          placeholder="Code"
          onChange={(event) => (authStore.code = event.target.value)}
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
