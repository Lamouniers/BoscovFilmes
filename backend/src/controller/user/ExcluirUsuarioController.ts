import { Request, Response } from "express";
import { ExcluirUsuarioService } from "../../services/user/ExcluirUsuarioService";

class ExcluirUsuarioController {
    async handle(req: Request, res: Response) {
      const { id } = req.params; // ID do usuário a ser deletado (vem da URL)
      const user_id = req.user_id; // ID do usuário logado (vem do middleware)

      const excluirUsuarioService = new ExcluirUsuarioService();

      const usuario = await excluirUsuarioService.execute({ user_id: user_id, id_deletar: id });

      return res.json(usuario);
    }
}
export { ExcluirUsuarioController };