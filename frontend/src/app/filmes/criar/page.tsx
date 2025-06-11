"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import styles from "./page.module.scss";
import { toast } from "react-toastify";

export default function CriarFilmePage() {
  const [nome, setNome] = useState("");
  const [diretor, setDiretor] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [poster, setPoster] = useState<File | null>(null);
  const [generos, setGeneros] = useState<string[]>([]);
  const [duracao, setDuracao] = useState("");
  const [produtora, setProdutora] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("diretor", diretor);
    formData.append("anoLancamento", anoLancamento);
    formData.append("duracao", duracao);
    formData.append("produtora", produtora);
    formData.append("classificacao", classificacao);
    formData.append("generos", JSON.stringify(generos));
    if (poster) {
      formData.append("poster", poster);
    }

    console.log("Dados enviados:", Object.fromEntries(formData.entries()));

    try {
      await api.post("/filme", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Filme criado com sucesso!");
      router.push("/"); // Redireciona para a página inicial ou outra página
    } catch (err) {
      console.error("Erro ao criar filme:", err);
      console.log("Dados enviados:", Object.fromEntries(formData.entries()));
      toast.error("Erro ao criar filme.");
    }
  };

  return (
    <div className={styles.containerCenter}>
      <div className={styles.container}>
        <h1 className={styles.title}>Criar Filme</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nome" className={styles.label}>
              Nome
            </label>
            <input
              type="text"
              id="nome"
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="diretor" className={styles.label}>
              Diretor
            </label>
            <input
              type="text"
              id="diretor"
              className={styles.input}
              value={diretor}
              onChange={(e) => setDiretor(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="anoLancamento" className={styles.label}>
              Ano de Lançamento
            </label>
            <input
              type="number"
              id="anoLancamento"
              className={styles.input}
              value={anoLancamento}
              onChange={(e) => setAnoLancamento(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="duracao" className={styles.label}>
              Duração (em minutos)
            </label>
            <input
              type="number"
              id="duracao"
              className={styles.input}
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="produtora" className={styles.label}>
              Produtora
            </label>
            <input
              type="text"
              id="produtora"
              className={styles.input}
              value={produtora}
              onChange={(e) => setProdutora(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="classificacao" className={styles.label}>
              Classificação
            </label>
            <input
              type="text"
              id="classificacao"
              className={styles.input}
              value={classificacao}
              onChange={(e) => setClassificacao(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="poster" className={styles.label}>
              Poster
            </label>
            <input
              type="file"
              id="poster"
              className={styles.input}
              onChange={(e) => setPoster(e.target.files?.[0] || null)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="generos" className={styles.label}>
              Gêneros
            </label>
            <input
              type="text"
              id="generos"
              className={styles.input}
              value={generos.join(", ")}
              onChange={(e) =>
                setGeneros(e.target.value.split(",").map((g) => g.trim()))
              }
              placeholder="Separe os gêneros por vírgulas"
            />
          </div>

          <div className={styles.formButtons}>
            <button type="submit" className={styles.submitButton}>
              Criar Filme
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => router.push("/")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
