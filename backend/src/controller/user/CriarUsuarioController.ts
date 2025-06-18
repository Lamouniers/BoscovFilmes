import { Request, Response } from "express";
import { CriarUsuarioService } from  "../../services/user/CriarUsuarioService";
import { validateSchema } from "../../middlewares/validateSchema"; // Importando o middleware de validação de schema
import { criarUsuarioSchema } from "../../validations/schemas"; // Importando o schema de validação

class CriarUsuarioController {
    async handle(req: Request, res: Response) {
        
        const { nome, email, senha, dataNascimento } = req.body;

        const criarUsuarioService = new CriarUsuarioService();
        
        try {
            const user = await criarUsuarioService.execute({
              nome,
              email,
              senha,
              dataNascimento,
            });

            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    };
};

//export { CriarUsuarioController };
export const criarUsuarioController = {  middleware: validateSchema(criarUsuarioSchema),  handle: new CriarUsuarioController().handle};