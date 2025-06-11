import { Request, Response } from "express";
import { AtualizarFilmeService } from "../../services/filme/AtualizarFilmeService";
import { validateSchema } from "../../middlewares/validateSchema";
import { atualizarFilmeSchema } from "../../validations/schemas";

class AtualizarFilmeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const user_id = req.user_id; // ID do usuário logado (vem do middleware)

    // Valida se o ID é um número válido
    const id_filme = Number(id);

    if (isNaN(id_filme)) {
      console.error("ID do filme inválido:", id);
      return res.status(400).json({ message: "ID do filme inválido" });
    }

    const { nome, diretor, anoLancamento, duracao, produtora, classificacao } =
      req.body;

    const duracaoNumber = duracao ? parseInt(duracao) : undefined;

    console.log("Dados recebidos no corpo da requisição:", {
      nome,
      diretor,
      anoLancamento,
      duracao,
      produtora,
      classificacao,
    });

    const atualizarFilmeService = new AtualizarFilmeService();

    // Verifica se o arquivo foi enviado
    const poster = (req as any).file ? (req as any).file.filename : undefined;
    console.log("Poster recebido:", poster);

    // Adiciona o caminho base da URL da imagem
    const baseUrl = `${req.protocol}://${req.get("host")}/files/`;
    const posterUrl = poster ? baseUrl + poster : undefined;

    try {
      const filmeAtualizado = await atualizarFilmeService.execute({
        user_id: Number(user_id),
        id_filme: Number(id),
        nome,
        diretor,
        anoLancamento,
        duracao: duracaoNumber,
        produtora,
        classificacao,
        poster: posterUrl, // Salva o caminho completo da URL
      });
      return res.json(filmeAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      return res.status(400).json({ message: error.message });
    }
  }
}

//export { AtualizarFilmeController };
export const atualizarFilmeController = {  middleware: validateSchema(atualizarFilmeSchema),  handle: new AtualizarFilmeController().handle };