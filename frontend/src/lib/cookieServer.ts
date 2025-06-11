import { cookies } from "next/headers";

export async function getCookieServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessao")?.value;
  return token || null;
}
