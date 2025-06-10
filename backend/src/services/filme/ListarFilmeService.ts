import prismaClient from "../../prisma";

class ListarFilmeService {
  async execute() {
    const filmes = await prismaClient.filme.findMany({
      include: {
        generos: {
          include: {
            genero: true,
          },
        },
        avaliacaos: {
          include: {
            usuario: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
      orderBy: {
        anoLancamento: "desc",
      },
    });

    return filmes; // Retorna todos os filmes com seus gêneros e avaliações
  }
}
export { ListarFilmeService };