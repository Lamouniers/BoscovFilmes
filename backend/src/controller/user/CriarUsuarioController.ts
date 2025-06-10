import { Request, Response } from "express";
import { CriarUsuarioService } from  "../../services/user/CriarUsuarioService";
import { validateSchema } from "../../middlewares/validateSchema"; // Importando o middleware de validação de schema
import { criarUsuarioSchema } from "../../validations/schemas"; // Importando o schema de validação

//responsavel por pegar os dados e passar para o service
class CriarUsuarioController {
    async handle(req: Request, res: Response) {
        //validacao ja foi feita pelo middleware
        const { nome, email, senha, dataNascimento } = req.body;

        const criarUsuarioService = new CriarUsuarioService();
        const user = await criarUsuarioService.execute({nome, email, senha, dataNascimento});

        return res.json(user);
    };
};

//export { CriarUsuarioController };
export const criarUsuarioController = {  middleware: validateSchema(criarUsuarioSchema),  handle: new CriarUsuarioController().handle};