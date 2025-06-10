import prismaClient from "../../prisma";

class ListaGeneroService {
    async execute(){

        // devolve um array com os generos que encontrar no banco
        const generos = await prismaClient.genero.findMany({
          orderBy: { descricao: "asc" },
        });

        return generos;
    }

}

export { ListaGeneroService };