import { Request, Response } from "express";
import { DetalhesUsuarioService } from "../../services/user/DetalhesUsuarioService";

class DetalhesUsuarioController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id; // o id do usuario vem do middleware de autenticacao
        //DEBUG: console.log("ID DO USUARIO: ", user_id);

        const detalhesUsuarioService = new DetalhesUsuarioService();

        const user = await detalhesUsuarioService.execute(user_id);

        res.json(user);

    }
}

export { DetalhesUsuarioController };