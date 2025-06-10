import { Request, Response } from "express";
import {
  fetchPopularMovies,
  fetchMovieDetails,
  fetchMovieCredits,
} from "../../services/api/tmdbService";
import { CriarFilmeService } from "../../services/filme/CriarFilmeService";
import prismaClient from "../../prisma";

class PopularFilmesController {
  async handle(req: Request, res: Response) {
    try {
      const user_id = Number(req.user_id); // ID do usuário admin

      // Verifica se o usuário é admin
      const usuario = await prismaClient.usuario.findUnique({
        where: { id: user_id },
      });

      if (!usuario?.tipoUsuario) {
        return res
          .status(403)
          .json({ error: "Acesso negado - somente administradores" });
      }

      // Busca filmes populares na API
      const popularMovies = await fetchPopularMovies(1); // Pega a primeira página

      // Para cada filme, busca detalhes e salva no banco
      for (const movie of popularMovies.slice(0, 20)) {
        // Limita a 20 filmes
        try {
          const details = await fetchMovieDetails(movie.id);
          const credits = await fetchMovieCredits(movie.id);

          // Encontra o diretor
          const director =
            credits.crew.find((person) => person.job === "Director")?.name ||
            "Desconhecido";

          // Mapeia os gêneros
          const generos = details.genres.map((genre) => genre.name);

          // Cria o filme no banco de dados
          const criarFilmeService = new CriarFilmeService();
          await criarFilmeService.execute({
            user_id: Number(user_id),
            nome: details.title,
            diretor: director,
            anoLancamento: details.release_date.substring(0, 4), // Pega apenas o ano
            duracao: details.runtime || 120, // Valor padrão se não tiver runtime
            produtora: details.production_companies[0]?.name || "Desconhecida",
            classificacao: "Livre", // TMDB não fornece classificação etária diretamente
            poster: details.poster_path
              ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
              : "",
            generos,
          });
        } catch (error) {
          console.error(`Erro ao processar filme ${movie.title}:`, error);
        }
      }

      return res.json({ message: "Filmes populares importados com sucesso!" });
    } catch (error) {
      console.error("Erro ao popular filmes:", error);
      return res.status(500).json({ error: "Erro ao popular filmes" });
    }
  }
}

export { PopularFilmesController };
