"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { api } from "@/services/api";
import Modal from "../components/modal";
import FiltroGeneros from "../components/filtroGeneros";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Filme {
  id: number;
  nome: string;
  poster: string;
  diretor: string;
  anoLancamento: string;
  classificacao: string;
  generos?: { id: number; descricao: string }[];
}

interface Genero {
  id: number;
  descricao: string;
}

export default function Page() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [selectedFilme, setSelectedFilme] = useState<Filme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [selectedGenero, setSelectedGenero] = useState<string>("todos");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [nome, setNome] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Verifica se o usuário é administrador
  const router = useRouter();

  // Verifica autenticação ao carregar o componente
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.get("/me");
        setIsAuthenticated(true);
        setUserId(response.data.id);
        setNome(response.data.nome);
        setIsAdmin(response.data.tipoUsuario); // Define se o usuário é administrador
      } catch (error) {
        setIsAuthenticated(false);
        setUserId(null);
        setIsAdmin(false);
      } finally {
        setLoadingAuth(false);
      }
    }

    checkAuth();
  }, []); //array vazia significa que o efeito roda apenas uma vez, quando monta o componente na tela

  // Carrega filmes baseado no gênero selecionado
  useEffect(() => {
    async function loadFilmes() {
      try {
        const endpoint =
          selectedGenero === "todos"
            ? "/filmes"
            : `/filmes/genero?genero=${encodeURIComponent(selectedGenero)}`;

        const response = await api.get(endpoint);
        setFilmes(response.data);
      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
      }
    }
    loadFilmes();
  }, [selectedGenero]); // Recarrega filmes quando o gênero selecionado muda, pois o que está dentro do array é `selectedGenero`

  // Carrega a lista de gêneros disponíveis
  useEffect(() => {
    async function loadGeneros() {
      try {
        const response = await api.get("/generos");
        setGeneros(response.data);
      } catch (err) {
        console.error("Erro ao carregar gêneros:", err);
      }
    }
    loadGeneros();
  }, []);

  const handleGeneroChange = (genero: string) => {
    setSelectedGenero(genero);
  };

  const handleFilmeClick = (filme: Filme) => {
    setSelectedFilme(filme);
    setIsModalOpen(true);
  };

  const handleDeleteFilme = async (id: number) => {
    try {
      await api.delete(`/filmes/${id}`);
      toast.success("Filme excluído com sucesso!");
      setFilmes((prevFilmes) => prevFilmes.filter((filme) => filme.id !== id));
    } catch (err) {
      console.error("Erro ao excluir filme:", err);
      toast.error("Erro ao excluir filme.");
    }
  };

  const handleEditFilme = (id: number) => {
    router.push(`/filmes/editar/${id}`); // Redireciona para a página de edição
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setIsAuthenticated(false);
      setUserId(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loadingAuth) {
    return <div className={styles.container}>Carregando...</div>;
  }

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        userId={userId ?? undefined}
        nome={nome ?? undefined}
      />
      <div className={styles.container}>
        <div className={styles.controls}>
          <FiltroGeneros
            generos={generos}
            selectedGenero={selectedGenero}
            onGeneroChange={handleGeneroChange}
          />
          {isAdmin && (
            <button
              className={styles.addButton}
              onClick={() => router.push("/filmes/criar")}
            >
              Adicionar Filme
            </button>
          )}
        </div>
        <div className={styles.filmesGrid}>
          {filmes.map((filme) => (
            <div key={filme.id} className={styles.filmeCard}>
              <div
                className={styles.filmeContent}
                onClick={() => handleFilmeClick(filme)}
              >
                <img
                  src={filme.poster}
                  alt={filme.nome}
                  className={styles.filmePoster}
                />
                <h4 className={styles.filmeTitle}>{filme.nome}</h4>
              </div>
              {isAdmin && (
                <div className={styles.adminControls}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditFilme(filme.id)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteFilme(filme.id)}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {isModalOpen && selectedFilme && (
          <Modal
            filme={selectedFilme}
            onClose={() => setIsModalOpen(false)}
            isAuthenticated={isAuthenticated}
            userId={userId ?? undefined}
          />
        )}
      </div>
    </>
  );
}
