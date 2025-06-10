import axios from "axios";

const TMDB_API_KEY = "8816f41dcc304ccda61378c254999475"; // Registre-se no TMDB para obter uma chave
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "pt-BR", // Para obter dados em português
  },
});

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  poster_path: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  production_companies: { name: string }[];
}

interface MovieCredits {
  crew: {
    id: number;
    name: string;
    job: string;
  }[];
}

export const fetchPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get("/movie/popular", {
    params: { page },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<TMDBMovie> => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async (
  movieId: number
): Promise<MovieCredits> => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const searchMovies = async (query: string) => {
  const response = await tmdbApi.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};
