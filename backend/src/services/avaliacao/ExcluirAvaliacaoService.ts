import prismaClient from "../../prisma";

interface excluirAvaliacaoRequest {
  id_avaliacao: number;
  id_usuario: number;
}

class ExcluirAvaliacaoService {
  async execute({ id_avaliacao, id_usuario }: excluirAvaliacaoRequest) {
    // Verifica se a avaliação existe
    const avaliacao = await prismaClient.avaliacao.findUnique({
      where: { id: id_avaliacao },
    });

    if (!avaliacao) {
      throw new Error("Avaliação não encontrada");
    }

    // Verifica se o usuário é o dono da avaliação ou um administrador
    const usuario = await prismaClient.usuario.findUnique({
      where: { id: id_usuario },
    });

    if (avaliacao.usuario_id !== id_usuario && !usuario.tipoUsuario) {
      throw new Error("Você não tem permissão para excluir esta avaliação");
    }

    // Exclui a avaliação em cascata
    await prismaClient.avaliacao.delete({
      where: { id: id_avaliacao },
    });

    return { message: "Avaliação excluída com sucesso" };
  }
}
export { ExcluirAvaliacaoService };