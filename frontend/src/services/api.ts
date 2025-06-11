import axios from "axios";
import { getCookieClient } from "@/lib/cookieClient";

export const api = axios.create({
    baseURL: "http://localhost:3002"
});

// Adiciona um interceptor para incluir o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = getCookieClient();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});