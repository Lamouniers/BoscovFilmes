"use client";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import StarRating from "../estrelas";

interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  usuario_id: number;
  usuario?: Usuario;
  created_at: string;
}

interface Usuario {
  id: number;
  nome: string;
  apelido?: string | null;
}

interface ModalProps {
  filme: {
    id: number;
    nome: string;
    poster: string;
    diretor: string;
    anoLancamento: string;
    classificacao: string;
    duracao?: number;
    produtora?: string;
    avaliacaos?: Avaliacao[];
  };
  onClose: () => void;
  isAuthenticated: boolean;
  userId?: number;
}

export default function Modal({
  filme,
  onClose,
  isAuthenticated,
  userId,
}: ModalProps) {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [minhaAvaliacao, setMinhaAvaliacao] = useState<Avaliacao | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (filme.avaliacaos && isAuthenticated && userId) {
      const minhaAval = filme.avaliacaos.find((av) => av.usuario_id === userId);
      setMinhaAvaliacao(minhaAval || null);
      if (minhaAval) {
        setNota(minhaAval.nota);
        setComentario(minhaAval.comentario);
      }
    }
  }, [filme, isAuthenticated, userId]);

  const handleSubmitAvaliacao = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (minhaAvaliacao) {
        const response = await api.patch(`/avaliacoes/${minhaAvaliacao.id}`, {
          nota,
          comentario,
        });

        if (filme.avaliacaos) {
          const updatedAvaliacoes = filme.avaliacaos.map((av) =>
            av.id === minhaAvaliacao.id ? response.data : av
          );
          filme.avaliacaos = updatedAvaliacoes;
        }

        setMinhaAvaliacao(response.data);
      } else {
        const response = await api.post(`/filmes/${filme.id}/avaliacoes`, {
          nota,
          comentario,
        });

        if (filme.avaliacaos) {
          filme.avaliacaos = [...filme.avaliacaos, response.data];
        } else {
          filme.avaliacaos = [response.data];
        }

        setMinhaAvaliacao(response.data);
      }
    } catch (err) {
      setError("Erro ao processar avaliação. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExcluirAvaliacao = async () => {
    if (!minhaAvaliacao) return;

    setIsLoading(true);
    setError("");

    try {
      await api.delete(`/avaliacoes/${minhaAvaliacao.id}`);

      if (filme.avaliacaos) {
        filme.avaliacaos = filme.avaliacaos.filter(
          (av) => av.id !== minhaAvaliacao.id
        );
      }

      setMinhaAvaliacao(null);
      setNota(0);
      setComentario("");
    } catch (err) {
      setError("Erro ao excluir avaliação. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalBody}>
          <img
            src={filme.poster}
            alt={filme.nome}
            className={styles.modalPoster}
          />

          <div className={styles.filmeInfo}>
            <h2>{filme.nome}</h2>
            <p>
              <strong>Diretor:</strong> {filme.diretor}
            </p>
            <p>
              <strong>Ano:</strong> {filme.anoLancamento}
            </p>
            <p>
              <strong>Classificação:</strong> {filme.classificacao}
            </p>
            {filme.duracao && (
              <p>
                <strong>Duração:</strong> {filme.duracao} minutos
              </p>
            )}
            {filme.produtora && (
              <p>
                <strong>Produtora:</strong> {filme.produtora}
              </p>
            )}
          </div>
        </div>

        <div className={styles.avaliacoesSection}>
          <h3>Avaliações</h3>

          {error && <p className={styles.error}>{error}</p>}

          {filme.avaliacaos && filme.avaliacaos.length > 0 ? (
            <div className={styles.avaliacoesList}>
              {filme.avaliacaos.map((avaliacao) => (
                <div key={avaliacao.id} className={styles.avaliacaoItem}>
                  <div className={styles.avaliacaoHeader}>
                    <strong>
                      {avaliacao.usuario
                        ? avaliacao.usuario.apelido || avaliacao.usuario.nome
                        : "Usuário desconhecido"}
                    </strong>
                    {/*<span>{formatarData(avaliacao.created_at)}</span>*/}
                  </div>
                  <StarRating rating={avaliacao.nota} editable={false} />
                  <p>{avaliacao.comentario}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
          )}

          {isAuthenticated && (
            <div className={styles.minhaAvaliacao}>
              <h4>
                {minhaAvaliacao
                  ? "Editar minha avaliação"
                  : "Adicionar avaliação"}
              </h4>
              <form onSubmit={handleSubmitAvaliacao}>
                <StarRating
                  rating={nota}
                  onRatingChange={setNota}
                  editable={!isLoading}
                />
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Deixe seu comentário..."
                  className={styles.comentarioInput}
                  required
                  disabled={isLoading}
                />
                <div className={styles.avaliacaoButtons}>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processando..."
                      : minhaAvaliacao
                      ? "Atualizar"
                      : "Enviar"}
                  </button>
                  {minhaAvaliacao && (
                    <button
                      type="button"
                      onClick={handleExcluirAvaliacao}
                      className={styles.deleteButton}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processando..." : "Excluir"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
