import { Router, Request, Response } from "express";
import multer from "multer";

import { criarUsuarioController } from "../controller/user/CriarUsuarioController";
import { autenticacaoUsuarioController } from "../controller/user/AutenticacaoUsuarioController";
import { DetalhesUsuarioController } from "../controller/user/DetalhesUsuarioController";
import { AutenticacaoMiddleware } from  "../middlewares/autenticacaoMiddleware";
import { ListaGeneroController } from "../controller/genero/ListaGeneroController";
import { criarFilmeController } from "../controller/filme/CriarFilmeController";
import { ListaGeneroFilmeController } from "../controller/generoFilme/ListaGeneroFilmeController";
import { ExcluirFilmeController } from "../controller/filme/ExcluirFilmeController";
import { DetalheFilmeController } from "../controller/filme/DetalheFilmeController";
import { ListarFilmeController } from "../controller/filme/ListarFilmeController";
import { ExcluirUsuarioController } from "../controller/user/ExcluirUsuarioController";
import { atualizarUsuarioController } from "../controller/user/AtualizarUsuarioController";
import { atualizarFilmeController } from "../controller/filme/AtualizarFilmeController";
import { criarAvaliacaoController } from "../controller/avaliacao/CriarAvaliacaoController";
import { ExcluirAvaliacaoController } from "../controller/avaliacao/ExcluirAvaliacaoController";
import { atualizarAvaliacaoController } from "../controller/avaliacao/AtualizarAvaliacaoController";
import { PopularFilmesController } from "../controller/filme/PopularFilmesController";


import uploadconfig from "../config/multer";


const router = Router();
const upload = multer(uploadconfig.upload("./tmp")); // Configuração do multer para upload de arquivos

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *         status:
 *           type: boolean
 *         apelido:
 *           type: string
 *         dataNascimento:
 *           type: string
 *         tipoUsuario:
 *           type: boolean
 *       example:
 *         nome: "João Silva"
 *         email: "joaosilva@gmail.com"
 *         senha: "123456"
 *         dataNascimento: "1990-01-01"
 * 
 *     Filme:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         diretor:
 *           type: string
 *         anoLancamento:
 *           type: string
 *         duracao:
 *           type: integer
 *         produtora:
 *           type: string
 *         classificacao:
 *           type: string
 *         poster:
 *           type: string
 *       example:
 *         nome: "O Poderoso Chefão"
 *         diretor: "Francis Ford Coppola"
 *         anoLancamento: "1972"
 *         duracao: 175
 * 
 *     Avaliacao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nota:
 *           type: number
 *         comentario:
 *           type: string
 *         usuario_id:
 *           type: integer
 *         filme_id:
 *           type: integer
 *       example:
 *         nota: 5
 *         comentario: "Excelente filme!"
 *         filme_id: 1
 * 
 *     Genero:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         descricao:
 *           type: string
 *       example:
 *         descricao: "Ação"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// o usuario bate na rota e vai para o controller
// o controller vai para o service

// -- ROTAS DE USUÁRIOS --

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/usuarios", criarUsuarioController.middleware, criarUsuarioController.handle); // Rota para criar um novo usuário

/**
 * @swagger
 * /sessao:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             example:
 *               email: "joao@email.com"
 *               senha: "123456"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/sessao", autenticacaoUsuarioController.middleware, autenticacaoUsuarioController.handle); // Rota para autenticar logar um usuário

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 */
router.get("/me", AutenticacaoMiddleware, new DetalhesUsuarioController().handle); // Rota para mostrar os detalhes do usuário

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário (inativa)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Usuário inativado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/usuarios/:id", AutenticacaoMiddleware, new ExcluirUsuarioController().handle); // Rota para deixar um usuário inativo

/**
 * @swagger
 * /usuarios:
 *   patch:
 *     summary: Atualiza dados do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.patch("/usuarios", AutenticacaoMiddleware, atualizarUsuarioController.middleware, atualizarUsuarioController.handle); // Rota para atualizar os dados do usuário

    
// -- ROTAS DE GÊNEROS --

/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Lista todos os gêneros
 *     tags: [Gêneros]
 *     responses:
 *       200:
 *         description: Lista de gêneros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genero'
 */
router.get("/generos", new ListaGeneroController().handle); // Rota para listar os gêneros existentes

/**
 * @swagger
 * /filmes/genero:
 *   get:
 *     summary: Lista filmes por gênero
 *     tags: [Gêneros]
 *     parameters:
 *       - in: query
 *         name: descricao
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do gênero para filtrar
 *     responses:
 *       200:
 *         description: Lista de filmes do gênero
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filme'
 */
router.get("/filmes/genero", new ListaGeneroFilmeController().handle); // Rota para listar os filmes de um genero específico

// -- ROTAS DE FILMES --

/**
 * @swagger
 * /filme:
 *   post:
 *     summary: Cria um novo filme (com upload de poster)
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - diretor
 *               - anoLancamento
 *               - duracao
 *               - poster
 *               - generos
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "O Poderoso Chefão"
 *               diretor:
 *                 type: string
 *                 example: "Francis Ford Coppola"
 *               anoLancamento:
 *                 type: string
 *                 example: "1972"
 *               duracao:
 *                 type: integer
 *                 example: 175
 *               produtora:
 *                 type: string
 *                 example: "Paramount Pictures"
 *               classificacao:
 *                 type: string
 *                 example: "18+"
 *               poster:
 *                 type: string
 *                 format: binary
 *               generos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Drama", "Crime"]
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/filme", AutenticacaoMiddleware, upload.single('poster'), criarFilmeController.middleware, criarFilmeController.handle); // Rota para criar um novo filme

/**
 * @swagger
 * /filmes/{id}:
 *   delete:
 *     summary: Remove um filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Filme removido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Filme não encontrado
 */
router.delete("/filmes/:id", AutenticacaoMiddleware, new ExcluirFilmeController().handle); // Rota para excluir um filme

/**
 * @swagger
 * /filmes/{id}:
 *   patch:
 *     summary: Atualiza um filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               diretor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               poster:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Filme atualizado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.patch("/filmes/:id", AutenticacaoMiddleware, upload.single('poster'), atualizarFilmeController.middleware, atualizarFilmeController.handle); // Rota para atualizar um filme

/**
 * @swagger
 * /filmes/detalhe/{id}:
 *   get:
 *     summary: Obtém detalhes de um filme
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Detalhes do filme
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filme'
 *       404:
 *         description: Filme não encontrado
 */
router.get("/filmes/detalhe/:id", new DetalheFilmeController().handle); // Rota para mostrar os detalhes de um filme

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filme'
 */
router.get("/filmes", new ListarFilmeController().handle); // Rota para listar todos os filmes

/**
 * @swagger
 * /filmes/popular:
 *   post:
 *     summary: Popula banco com filmes (apenas admin)
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Banco populado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (requer admin)
 */
router.post("/filmes/popular", AutenticacaoMiddleware, new PopularFilmesController().handle);

// -- ROTAS DE AVALIAÇÕES --

/**
 * @swagger
 * /filmes/{id}/avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação para um filme
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do filme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *               comentario:
 *                 type: string
 *             example:
 *               nota: 5
 *               comentario: "Excelente filme!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/filmes/:id/avaliacoes", AutenticacaoMiddleware, criarAvaliacaoController.middleware, criarAvaliacaoController.handle); // Rota para criar uma nova avaliação

/**
 * @swagger
 * /avaliacoes/{id}:
 *   delete:
 *     summary: Remove uma avaliação
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Avaliação removida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Avaliação não encontrada
 */
router.delete("/avaliacoes/:id", AutenticacaoMiddleware, new ExcluirAvaliacaoController().handle); // Rota para excluir uma avaliação

/**
 * @swagger
 * /avaliacoes/{id}:
 *   patch:
 *     summary: Atualiza uma avaliação
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avaliacao'
 *     responses:
 *       200:
 *         description: Avaliação atualizada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.patch("/avaliacoes/:id", AutenticacaoMiddleware,  atualizarAvaliacaoController.middleware,  atualizarAvaliacaoController.handle); // Rota para atualizar uma avaliação

export {router};
