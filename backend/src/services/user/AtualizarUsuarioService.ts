import prismaClient from "../../prisma";
import { AtualizarUsuarioServiceInput } from "../../validations/schemas";

// interface AtualizarUsuarioRequest {
//   user_id: string;
//   nome?: string; 
//   apelido?: string | null;
//   dataNascimento?: string;
// }

class AtualizarUsuarioService {
  async execute({ user_id, nome, apelido, dataNascimento, }: AtualizarUsuarioServiceInput) {
    const usuario = await prismaClient.usuario.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    if (!usuario) {
      throw new Error("Você não tem permissão para atualizar este usuário");
    }

    // Atualiza apenas os campos que foram enviados
    const usuarioAtualizado = await prismaClient.usuario.update({
      where: {
        id: parseInt(user_id),
      },
      data: {
        nome: nome !== undefined ? nome : usuario.nome, // Mantém o atual se não for enviado
        apelido: apelido !== undefined ? apelido : usuario.apelido,
        dataNascimento: dataNascimento !== undefined ? dataNascimento : usuario.dataNascimento,
      },
      select: {
        id: true,
        nome: true,
        apelido: true,
        dataNascimento: true,
        email: true,
      },
    });

    return usuarioAtualizado;
  }
}

export { AtualizarUsuarioService };
