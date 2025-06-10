import { Request, Response } from "express";
import { CriarFilmeService } from "../../services/filme/CriarFilmeService";
import { validateSchema } from "../../middlewares/validateSchema";
import { criarFilmeSchema } from "../../validations/schemas";

class CriarFilmeController {
  async handle(req: Request, res: Response) {
    const {
      nome,
      diretor,
      anoLancamento,
      duracao,
      produtora,
      classificacao,
      generos,
    } = req.body;
    const user_id = req.user_id; // ID do usuário logado (vem do middleware)

    const duracaoNumber = parseInt(duracao);
    const generosArray =
      typeof generos === "string" ? JSON.parse(generos) : generos;

    const criarFilmeService = new CriarFilmeService();

    // verifica se o arquivo foi enviado
    if (!(req as any).file) {
      throw new Error("Erro no upload do arquivo");
    } else {
      const { originalname, filename: poster } = (req as any).file; //pega o nome original e o nome do arquivo

      // Adiciona o caminho base da URL da imagem
      const baseUrl = `${req.protocol}://${req.get("host")}/files/`;
      const posterUrl = baseUrl + poster;

      const filme = await criarFilmeService.execute({
        user_id: Number(user_id),
        nome,
        diretor,
        anoLancamento,
        duracao: duracaoNumber,
        produtora,
        classificacao,
        poster: posterUrl,
        generos: generosArray,
      });
      return res.json(filme); //retorna os dados para o front-end
    }
  }
}

//export { CriarFilmeController };
export const criarFilmeController = {
  middleware: validateSchema(criarFilmeSchema),
  handle: new CriarFilmeController().handle,
};
