import { Request, Response } from "express";
import { AtualizarFilmeService } from "../../services/filme/AtualizarFilmeService";
import { validateSchema } from "../../middlewares/validateSchema";
import { atualizarFilmeSchema } from "../../validations/schemas";

class AtualizarFilmeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const user_id = req.user_id; // ID do usuário logado (vem do middleware)
    
    const { nome, diretor, anoLancamento, duracao, produtora, classificacao } =
      req.body;

    const duracaoNumber = duracao ? parseInt(duracao) : undefined;

    const atualizarFilmeService = new AtualizarFilmeService();

    const poster = (req as any).file ? (req as any).file.filename : undefined;

    const filmeAtualizado = await atualizarFilmeService.execute({
      user_id: Number(user_id),
      id_filme: Number(id),
      nome,
      diretor,
      anoLancamento,
      duracao: duracaoNumber,
      produtora,
      classificacao,
      poster,
    });

    return res.json(filmeAtualizado);
  }
}

//export { AtualizarFilmeController };
export const atualizarFilmeController = {  middleware: validateSchema(atualizarFilmeSchema),  handle: new AtualizarFilmeController().handle };