"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Use `useParams` para acessar os parâmetros
import { api } from "@/services/api";
import styles from "./page.module.scss";
import { toast } from "react-toastify";

export default function EditarFilmePage() {
  const [nome, setNome] = useState("");
  const [diretor, setDiretor] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [poster, setPoster] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams(); // Resolve os parâmetros dinâmicos da rota

  useEffect(() => {
    async function fetchFilme() {
      if (!params?.id) return; // Certifique-se de que `params.id` está disponível

      try {
        const response = await api.get(`/filmes/detalhe/${params.id}`);
        const filme = response.data;

        setNome(filme.nome);
        setDiretor(filme.diretor);
        setAnoLancamento(filme.anoLancamento);
        setClassificacao(filme.classificacao);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar filme:", err);
        toast.error("Erro ao carregar filme.");
        setLoading(false);
      }
    }

    fetchFilme();
  }, [params?.id]); // Use optional chaining para evitar erros

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("diretor", diretor);
    formData.append("anoLancamento", anoLancamento);
    formData.append("classificacao", classificacao);
    if (poster) {
      formData.append("poster", poster);
    }

    console.log("Dados enviados:", Object.fromEntries(formData.entries()));
    try {
      await api.patch(`/filmes/${params?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Filme atualizado com sucesso!");
      router.push("/"); // Redireciona para a página inicial ou outra página
    } catch (err) {
      console.error("Erro ao atualizar filme:", err);
      toast.error("Erro ao atualizar filme.");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <div className={styles.container}>
          <h1 className={styles.title}>Editar Filme</h1>
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

            <div className={styles.formButtons}>
              <button type="submit" className={styles.submitButton}>
                Atualizar Filme
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
    </>
  );
}
