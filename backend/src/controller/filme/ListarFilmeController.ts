import { Request, Response } from "express";
import { ListarFilmeService } from "../../services/filme/ListarFilmeService";

class ListarFilmeController {
    async handle(req: Request, res: Response) {
        const listarFilmeService = new ListarFilmeService();

        try {
            const filmes = await listarFilmeService.execute();
            return res.json(filmes);
        } catch (err) {
            return res.status(400).json(`Erro ao listar filmes: ${err.message}`);
        };
    };
};

export { ListarFilmeController };