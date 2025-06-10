import { Request, Response } from "express";
import { ListaGeneroFilmeService } from "../../services/generoFilme/ListaGeneroFilmeService";

class ListaGeneroFilmeController {
  async handle(req: Request, res: Response) {
    const  genero  = req.query.genero as string; // recebe a string da query
    console.log(`CONSTANTE GENERO VINDA DA REQUISICAO DA QUERY: ${genero}`);

    const listaGeneroFilmeService = new ListaGeneroFilmeService();

    try {
      const filmes = await listaGeneroFilmeService.execute({ genero });
      return res.json(filmes);
    } catch (err) {
      return res.status(400).json("Erro ao listar filmes por genero");
    }
  }
}

export { ListaGeneroFilmeController };
