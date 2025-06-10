import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { ExcluirAvaliacaoService } from "../../services/avaliacao/ExcluirAvaliacaoService";

class ExcluirAvaliacaoController {
  async handle(req: Request, res: Response) {
    const id_avaliacao = Number(req.params.id);
    const id_usuario = Number(req.user_id);

    const excluirAvaliacaoService = new ExcluirAvaliacaoService();

    try{
      const avaliacao = await excluirAvaliacaoService.execute({ id_avaliacao, id_usuario });
      return res.status(204).end(); // padrao de resposta 204 (sem conteúdo) para exclusão retorna 1
        //ou return res.status(200).json({ message: "Filme excluído com sucesso" }); // Retorna uma mensagem de sucesso
        
    } catch (err) {
      return res.status(400).json(err.message);
    }
    

  }
}

export { ExcluirAvaliacaoController };