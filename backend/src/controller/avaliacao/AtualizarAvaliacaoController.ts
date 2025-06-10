import { Request, Response } from "express";
import { AtualizarAvaliacaoService } from "../../services/avaliacao/AtualizarAvaliacaoService";
import { validateSchema } from "../../middlewares/validateSchema";
import { avaliacaoSchema } from "../../validations/schemas";

class AtualizarAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { nota, comentario } = req.body;
    const id_avaliacao = req.params.id;
    console.log(id_avaliacao);
    const id_usuario = req.user_id;

    const atualizarAvaliacaoService = new AtualizarAvaliacaoService();
    const avaliacao = await atualizarAvaliacaoService.execute({
      id_avaliacao: Number(id_avaliacao),
      id_usuario: Number(id_usuario),
      nota: nota !== undefined ? Number(nota) : undefined,
      comentario,
    });

    return res.json(avaliacao);
  }
}

export const atualizarAvaliacaoController = {
  middleware: validateSchema(avaliacaoSchema),
  handle: new AtualizarAvaliacaoController().handle,
};
