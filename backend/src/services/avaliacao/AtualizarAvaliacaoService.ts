import prismaClient from "../../prisma";
import { AvaliacaoInput } from "../../validations/schemas";

class AtualizarAvaliacaoService {
  async execute({ id_avaliacao, id_usuario, nota, comentario }: AvaliacaoInput & { id_avaliacao: number; id_usuario: number; }) {
    // Verifica se a avaliação existe
    const avaliacao = await prismaClient.avaliacao.findUnique({
      where: { id: id_avaliacao },
    });
    

    if (!avaliacao) {
      throw new Error("Avaliação não encontrada");
    }

    // Verifica se o usuário é o dono da avaliação
    if (avaliacao.usuario_id !== id_usuario) {
      throw new Error("Você não tem permissão para editar esta avaliação");
    }

    // Atualiza a avaliação
    const avaliacaoAtualizada = await prismaClient.avaliacao.update({
      where: { id: id_avaliacao },
      data: {
        nota,
        comentario,
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

    return avaliacaoAtualizada;
  }
}

export { AtualizarAvaliacaoService };