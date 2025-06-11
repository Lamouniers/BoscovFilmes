"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoImg from "/public/logo.svg";
import { LogOutIcon } from "lucide-react";
import {deleteCookie} from "cookies-next"
import { useRouter } from "next/navigation"; //so pode ser usado dentro de um componente React "use cliente"
import { use } from "react";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";

interface HeaderProps {
  isAuthenticated: boolean;
  userId?: number | null; // userId pode ser opcional ou nulo
  nome?: string | null; // nome pode ser opcional ou nulo
}

function Header({ isAuthenticated, userId, nome }: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("sessao", { path: "/" });

    toast.success("Logout realizado com sucesso!");

    setTimeout(() => {
      window.location.href = "/"; // força a atualização da página após o logout
    }, 1000);
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image
            alt="Logo Boscov Filmes"
            src={logoImg}
            width={300}
            height={180}
            priority={true}
            quality={100}
          />
        </Link>

        <nav>
          {isAuthenticated ? (
            <>
              <h1>Olá, {nome || "Usuário"}</h1>{" "}
              {/* Exibe o nome do usuário ou "Usuário" como fallback */}
              <form action={handleLogout}>
                <button type="submit">
                  <LogOutIcon size={25} color="#FFF" />
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Cadastrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header;
