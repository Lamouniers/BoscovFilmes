"use client";

import Link from "next/link";
import styles from "./not-found.module.scss";
import logoImg from "/public/logo.svg";
import boscov from "/public/fumando.svg";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
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
      <Image
        alt="Logo Boscov Filmes"
        src={boscov}
        width={300}
        height={180}
        priority={true}
        quality={100}
      />

      <h1 className={styles.title}>404 - Página Não Encontrada</h1>
      <p className={styles.message}>
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link href="/" className={styles.homeLink}>
        Voltar para a página inicial
      </Link>
    </div>
  );
}
