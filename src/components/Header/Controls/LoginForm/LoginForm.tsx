import { authStore } from "@/components/Header/Controls/store";
import { Button, Input } from "@chakra-ui/react";
import { useSnapshot } from "valtio";

type Props = {
  onRegister: () => void;
};

export const LoginForm = ({ onRegister }: Props) => {
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

      <Button>Login</Button>
      <Button variant="outline" onClick={onRegister}>
        Register
      </Button>
      <Button variant="link">Forgot password</Button>
    </>
  );
};
