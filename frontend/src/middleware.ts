import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rotas públicas que não precisam de autenticação
  if (pathname.startsWith("/_next") || pathname === "/" || pathname === "/signup" || pathname === "/login")  {
    return NextResponse.next();
  }

  const token = await getCookieServer();

  // Rotas protegidas
  if (pathname.startsWith("/filmes")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token);
    if (!isValid) {
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.delete("sessao");
      return response;
    }

    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;
    if (!user.tipoUsuario) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  if (!token) return false;

  try {
    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (err) {
    return false;
  }
}