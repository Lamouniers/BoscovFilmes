import prismaClient from "../../prisma";

interface excluirFilmeRequest {
  id_filme: number;
  user_id: number;
}
class ExcluirFilmeService {
  async execute({ id_filme, user_id }: excluirFilmeRequest) {
    // Verifica se o filme existe
    const filmeExiste = await prismaClient.filme.findFirst({
      where: {
        id: id_filme,
      },
    });

    if (!filmeExiste) {
      throw new Error("Filme não encontrado");
    }

    // Verifica se o usuário logado é um administrador
    const usuario = await prismaClient.usuario.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!usuario.tipoUsuario) {
      throw new Error("Você não tem permissão para excluir este filme");
    }       

    // Exclui o filme
    try {
      const filme = await prismaClient.filme.delete({
        where: {
          id: id_filme,
        },
      });

      return { filme };

    } catch (error) {
      throw new Error(`Erro ao excluir filme: ${error}`);
    }
  }
}

export { ExcluirFilmeService };