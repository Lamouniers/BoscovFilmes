import { Request, Response } from "express";
import { AtualizarUsuarioService } from "../../services/user/AtualizarUsuarioService";
import { validateSchema } from "../../middlewares/validateSchema";
import { atualizarUsuarioSchema } from "../../validations/schemas";

class AtualizarUsuarioController {
  async handle(req: Request, res: Response) {
    
    const user_id = req.user_id; // ID do usuário logado (vem do middleware)
    const { nome, apelido, dataNascimento } = req.body; // Dados que podem ser atualizados

    const atualizarUsuarioService = new AtualizarUsuarioService();

    const usuarioAtualizado = await atualizarUsuarioService.execute({
      user_id,
      nome,
      apelido,
      dataNascimento,
    });

    return res.json(usuarioAtualizado);
  }
}

//export { AtualizarUsuarioController };
export const atualizarUsuarioController = {  middleware: validateSchema(atualizarUsuarioSchema),  handle: new AtualizarUsuarioController().handle };
