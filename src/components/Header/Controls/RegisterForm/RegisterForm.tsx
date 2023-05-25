import { authStore } from "@/components/Header/Controls/store";
import { Button, Input } from "@chakra-ui/react";
import { useSnapshot } from "valtio";

type Props = {
  onLogin: () => void;
};

export const RegisterForm = ({ onLogin }: Props) => {
  const snap = useSnapshot(authStore);

  return (
    <>
      <Input
        value={snap.login}
        onChange={(event) => (authStore.login = event.target.value)}
        placeholder="Login"
      />
      <Input
        value={snap.password}
        onChange={(event) => (authStore.password = event.target.value)}
        placeholder="Password"
      />
      <Input placeholder="Repeat Password" />

      <Button>Register</Button>
      <Button variant="link" onClick={onLogin}>
        Login
      </Button>
    </>
  );
};
