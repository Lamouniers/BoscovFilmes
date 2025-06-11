import { getCookie } from "cookies-next";

export function getCookieClient() {
  const token = getCookie("sessao");
  return token;
}
