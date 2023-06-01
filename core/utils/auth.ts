import { USER_ACCESS_TOKEN_KEY, USER_REFRESH_TOKEN_KEY } from "./consts";

export const getUserToken = () => {
  try {
    return localStorage.getItem(USER_ACCESS_TOKEN_KEY);
  } catch (error) {}
};

export const setUserTokens = (accessToken: string, refreshToken: string) => {
  try {
    localStorage.setItem(USER_ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(USER_REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {}
};
