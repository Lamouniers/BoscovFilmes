import { z } from "zod";

// ESQUEMA USUÁRIOS
// Esquema para criação de usuário
export const criarUsuarioSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD"),
});

// Esquema para autenticação
export const autenticacaoSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

// Esquema para atualização de usuário
export const atualizarUsuarioSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").optional(),
  apelido: z.string().min(3, "Apelido deve ter pelo menos 3 caracteres").nullable().optional(),
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD").optional(),
});

export const atualizarUsuarioRequestSchema = z.object({
  body: atualizarUsuarioSchema, // Valida o corpo da requisição
  params: z.object({}).optional(), // Parâmetros opcionais
});

// Tipo para o service (inclui user_id)
export type AtualizarUsuarioServiceInput = {
  user_id: string;
  nome?: string;
  apelido?: string | null;
  dataNascimento?: string;
};

//ESQUEMA FILMES
// Esquema para criação de filme
export const criarFilmeSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  diretor: z.string().min(3, "Diretor deve ter pelo menos 3 caracteres"),
  anoLancamento: z.string().regex(/^\d{4}$/, "Ano de lançamento deve ter 4 dígitos"),
  duracao: z.string().regex(/^\d+$/, "Duração deve ser um número").transform(Number),
  produtora: z.string().min(3, "Produtora deve ter pelo menos 3 caracteres"),
  classificacao: z.string().min(1, "Classificação é obrigatória"),
  generos: z.array(z.string().min(1, "Gênero não pode ser vazio")).nonempty("Pelo menos um gênero deve ser selecionado"),
});

// Esquema para atualização de filme
export const atualizarFilmeSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").optional(),
  diretor: z.string().min(3, "Diretor deve ter pelo menos 3 caracteres").optional(),
  anoLancamento: z.string().regex(/^\d{4}$/, "Ano de lançamento deve ter 4 dígitos").optional(),
  duracao: z.string().regex(/^\d+$/, "Duração deve ser um número").transform(Number).optional(),
  produtora: z.string().min(3, "Produtora deve ter pelo menos 3 caracteres").optional(),
  classificacao: z.string().min(1, "Classificação é obrigatória").optional(),
});

// ESQUEMA AVALIAÇÕES
// Esquema para criação de avaliação
export const avaliacaoSchema = z.object({
  nota: z.number().min(1,  "A nota deve estar entre 0 e 5").max(5, "A nota deve estar entre 0 e 5"),
  comentario: z.string().max(500, "O comentário deve ter no máximo 500 caracteres").optional(),
});



// esquema de criação de usuário
export type CriarUsuarioInput = z.infer<typeof criarUsuarioSchema>;

// esquema de autenticação
export type AutenticacaoInput = z.infer<typeof autenticacaoSchema>;

// esquema de atualização de usuário
export type AtualizarUsuarioInput = z.infer<typeof atualizarUsuarioSchema>;

// esquema de criacao de filme
export type CriarFilmeInput = z.infer<typeof criarFilmeSchema>;

// esquema de atualização de filme
export type AtualizarFilmeInput = z.infer<typeof atualizarFilmeSchema>;

// esquema de criação de avaliação
export type AvaliacaoInput = z.infer<typeof avaliacaoSchema>;