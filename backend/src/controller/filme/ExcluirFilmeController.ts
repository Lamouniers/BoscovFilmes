import { Request, Response } from "express";
import { ExcluirFilmeService } from "../../services/filme/ExcluirFilmeService";

class ExcluirFilmeController {
    async handle(req: Request, res: Response) {
        const { id } = req.params; // Pega o id do filme da URL
        const user_id = req.user_id; // ID do usuário logado (vem do middleware)
    
        const excluirFilmeService = new ExcluirFilmeService();
    
        try {
            const filme = await excluirFilmeService.execute({ id_filme: Number(id), user_id: Number(user_id) });

            return res.status(204).end(); // padrao de resposta 204 (sem conteúdo) para exclusão retorna 1
            //ou return res.status(200).json({ message: "Filme excluído com sucesso" });
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }
};

export { ExcluirFilmeController };