import prismaClient from "../../prisma";

interface DetalheFilmeRequest {
  id_filme: number;
}
class DetalheFilmeService {
  async execute({ id_filme }: DetalheFilmeRequest) {
    // Verifica se o filme existe
    const filme = await prismaClient.filme.findFirst({
      where: {
        id: id_filme,
      },
      include: {
        generos: {
          include: {
            genero: true,
          },
        },
        avaliacaos: {
          // Filtra avaliações de usuários ativos
          where: { usuario: { status: true } },
          include: {
            usuario: { select: { nome: true } }, // mostra o nome do usuário que fez a avaliação
          },
        },
      },
    });

    if (!filme) {
      throw new Error("Filme não encontrado");
    }

    return filme;
  }
}

export { DetalheFilmeService };