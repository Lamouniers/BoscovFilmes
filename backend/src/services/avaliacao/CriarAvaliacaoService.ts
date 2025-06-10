import prismaClient from "../../prisma";
import { AvaliacaoInput } from "../../validations/schemas";

class CriarAvaliacaoService {
  async execute({
    nota,
    comentario,
    user_id,
    filme_id,
  }: AvaliacaoInput & { user_id: number; filme_id: number }) {
    // Verifica se o filme existe
    const filme = await prismaClient.filme.findUnique({
      where: { id: filme_id },
    });

    if (!filme) {
      throw new Error("Filme não encontrado");
    }

    // Verifica se o usuário já avaliou este filme
    const avaliacaoExistente = await prismaClient.avaliacao.findFirst({
      where: {
        usuario_id: user_id,
        filme_id: filme_id,
      },
    });

    if (avaliacaoExistente) {
      throw new Error("Você já avaliou este filme!");
    }

    // Cria a avaliação
    const avaliacao = await prismaClient.avaliacao.create({
      data: {
        nota,
        comentario,
        usuario_id: user_id,
        filme_id,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            apelido: true,
          },
        },
        filme: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    return avaliacao;
  }
}

export { CriarAvaliacaoService };
