import { Request, Response } from "express";
import { ListaGeneroService } from "../../services/genero/ListaGeneroService";

class ListaGeneroController {
    async handle(req: Request, res: Response) {

        const listaGeneroService = new ListaGeneroService();
        const generos = await listaGeneroService.execute(); //recebe o aray de generos do service
        return res.json(generos); //retorna os dados para o front-end
    }
};

export { ListaGeneroController };