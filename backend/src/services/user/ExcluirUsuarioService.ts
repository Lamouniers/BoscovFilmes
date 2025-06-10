import prismaClient from "../../prisma";

interface ExcluirUsuarioRequest {
  user_id: string;
  id_deletar: string;
};

class ExcluirUsuarioService {
  async execute({ user_id, id_deletar }: ExcluirUsuarioRequest) {

    // Verifica se o usuário logado é um administrador
    const usuarioLogado = await prismaClient.usuario.findFirst({
      where: {
        id: parseInt(user_id),
        tipoUsuario: true, // Verifica se é admin
      },
    });

    if (!usuarioLogado) {
      throw new Error("Apenas administradores podem deletar usuários");
    }

    // Verifica se o usuário a ser deletado existe
    const usuario = await prismaClient.usuario.findFirst({
      where: {
        id: parseInt(id_deletar),
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Soft delete: Altera o status do usuário para inativo
    try {
      await prismaClient.usuario.update({
        where: { id: parseInt(id_deletar) },
        data: { status: false },
      });

      return { message: "Usuário inativado com sucesso" };
    } catch (error) {
      throw new Error(`Erro ao inativar usuário: ${error}`);
    };
  };
};

export { ExcluirUsuarioService };