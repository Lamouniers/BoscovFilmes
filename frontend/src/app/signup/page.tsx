"use client";
import styles from "@/app/login/page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import axios from "axios";
import logoImg from "/public/logo.svg";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  async function handleRegister(formData: FormData) {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData.get("confirmPassword")?.toString().trim();
    const dataNascimento = formData.get("dataNascimento")?.toString().trim();

    let hasError = false;

    // Validação do nome
    if (!name) {
      setNameError("O campo de nome é obrigatório.");
      hasError = true;
    } else {
      setNameError(null);
    }

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
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    // Validação de confirmar senha
    if (!confirmPassword) {
      setConfirmPasswordError("O campo de confirmar senha é obrigatório.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      hasError = true;
    } else {
      setConfirmPasswordError(null);
    }

    // Se houver erros, não envia os dados para o backend
    if (hasError) return;

    try {
      const response = await api.post("/usuarios", {
        nome: name,
        email,
        senha: password,
        dataNascimento,
      });

      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Erro ao cadastrar:", err.response?.data || err.message);
        setBackendError(err.response?.data?.message || "Erro ao cadastrar usuário.");
        toast.error(err.response?.data?.message || "Erro ao cadastrar usuário.");
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
            alt="Logo Boscov Filmes"
            src={logoImg}
            width={300}
            height={180}
            priority={true}
            quality={100}
          />
        </Link>
        <div className={styles.formContainer}>
          <section className={styles.login}>
            <h1>Criando sua conta</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleRegister(formData);
              }}
            >
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Digite seu nome..."
                  className={`${styles.input} ${
                    nameError ? styles.errorInput : ""
                  }`}
                />
                {nameError && (
                  <p className={styles.errorMessage}>{nameError}</p>
                )}
              </div>

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
                  type="date"
                  name="dataNascimento"
                  className={styles.input}
                />
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

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme sua senha..."
                  className={`${styles.input} ${
                    confirmPasswordError ? styles.errorInput : ""
                  }`}
                />
                {confirmPasswordError && (
                  <p className={styles.errorMessage}>{confirmPasswordError}</p>
                )}
              </div>

              <button type="submit" className={styles.button}>
                Cadastrar
              </button>
            </form>

    

            <Link href="/login" className={styles.text}>
              Já possui uma conta? Faça o login
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
