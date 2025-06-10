import prismaClient from "../../prisma";

interface FilmePorGeneroRequest {
  genero: string;
}

class ListaGeneroFilmeService {
  async execute({ genero }: FilmePorGeneroRequest) {
    // Passo 1: Encontrar o ID do gênero
    const generoNoBanco = await prismaClient.genero.findFirst({
      where: {
        descricao: genero, // Busca exata (case-sensitive)
      },
    });

    if (!generoNoBanco) {
      throw new Error("Gênero não encontrado");
    }

    // Passo 2: Encontrar os filmes relacionados
    const filmes = await prismaClient.filme.findMany({
      where: {
        generos: {
          some: {
            genero_id: generoNoBanco.id,
          },
        },
      },
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
    });

    return filmes;
  }
}

export { ListaGeneroFilmeService };