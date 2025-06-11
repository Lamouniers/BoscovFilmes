"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import axios from "axios";
import logoImg from "/public/logo.svg";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  async function handleLogin(formData: FormData) {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    let hasError = false;

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("O campo de email é obrigatório.");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um email válido.");
      hasError = true;
    } else {
      setEmailError(null);
    }

    // Validação da senha
    if (!password) {
      setPasswordError("O campo de senha é obrigatório.");
      hasError = true;
    } else if (password.length < 5) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    // Se houver erros, não envia os dados para o backend
    if (hasError) return;

    try {
      const response = await api.post("/sessao", {
        email,
        senha: password,
      });

      toast.success("Login realizado com sucesso!");

      // Armazenar o token no cookie
      const expressTime = 60 * 60 * 24 * 7; // 7 dias em segundos
      setCookie("sessao", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production", // Define secure como true se estiver em produção
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Erro ao autenticar:", err.response?.data || err.message);
        setBackendError(
          err.response?.data?.message || "Erro ao autenticar usuário."
        );
        toast.error(
          err.response?.data?.message || "Erro ao autenticar usuário."
        );
      } else {
        console.log("Erro desconhecido:", err);
        setBackendError("Ocorreu um erro inesperado. Tente novamente.");
        toast.error("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Link href="/">
          <Image
            alt="Logo Sujeito Pizza"
            src={logoImg}
            width={300}
            height={180}
            priority={true}
            quality={100}
          />
        </Link>
        <div className={styles.formContainer}>
          <section className={styles.login}>
            <h1>Faça seu login para avaliar filmes</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleLogin(formData);
              }}
            >
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Digite seu email..."
                  className={`${styles.input} ${
                    emailError ? styles.errorInput : ""
                  }`}
                />
                {emailError && (
                  <p className={styles.errorMessage}>{emailError}</p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  className={`${styles.input} ${
                    passwordError ? styles.errorInput : ""
                  }`}
                />
                {passwordError && (
                  <p className={styles.errorMessage}>{passwordError}</p>
                )}
              </div>

              <button type="submit" className={styles.button}>
                Acessar
              </button>
            </form>

            {backendError && (
              <p className={styles.errorMessage}>{backendError}</p>
            )}

            <Link href="/signup" className={styles.text}>
              Não possui uma conta? Cadastre-se
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
