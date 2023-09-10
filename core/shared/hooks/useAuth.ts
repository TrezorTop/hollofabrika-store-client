import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUserToken } from "../utils/auth";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (!getUserToken()) router.push("/");
  }, [router]);
};
