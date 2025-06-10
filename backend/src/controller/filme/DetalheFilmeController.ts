import { Request, Response } from "express";
import { DetalheFilmeService } from "../../services/filme/DetalheFilmeService";

class DetalheFilmeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // Pega o id do filme da URL

    const detalheFilmeService = new DetalheFilmeService();

    try {
      const filme = await detalheFilmeService.execute({ id_filme: Number(id) });

      return res.json(filme);
    } catch (err) {
      return res.status(400).json(`Erro ao mostrar detalhes do filme: ${err.message}`);
    }
  }
}
export { DetalheFilmeController };