import { Request, Response } from "express";
import { CriarAvaliacaoService } from "../../services/avaliacao/CriarAvaliacaoService";
import { validateSchema } from "../../middlewares/validateSchema";
import { avaliacaoSchema } from "../../validations/schemas";

class CriarAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { nota, comentario } = req.body;
    const filme_id = req.params.id; // Agora vem da rota
    const user_id = req.user_id; // ID do usuário logado (vem do middleware)

    const criarAvaliacaoService = new CriarAvaliacaoService();
    const avaliacao = await criarAvaliacaoService.execute({
      nota: Number(nota),
      comentario,
      filme_id: Number(filme_id),
      user_id: Number(user_id),
    });

    return res.json(avaliacao);
  }
}

export const criarAvaliacaoController = {
  middleware: validateSchema(avaliacaoSchema),
  handle: new CriarAvaliacaoController().handle,
};
