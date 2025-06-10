import { Response, Request } from "express";
import { AutenticacaoUsuarioService } from "../../services/user/AutenticacaoUsuarioService";
import { validateSchema } from "../../middlewares/validateSchema";
import { autenticacaoSchema } from "../../validations/schemas";

class AutenticacaoUsuarioController {
    async handle(req: Request, res: Response) {
        
        const { email, senha } = req.body; //pega os dados do body da requisição
            
        const autenticacaoService = new AutenticacaoUsuarioService();
        const autenticacao = await autenticacaoService.execute({ email, senha }); //envia os dados para o service

        return res.json(autenticacao); //retorna os dados para o front-end
    }
};

//export { AutenticacaoUsuarioController };
export const autenticacaoUsuarioController = { middleware: validateSchema(autenticacaoSchema),  handle: new AutenticacaoUsuarioController().handle };