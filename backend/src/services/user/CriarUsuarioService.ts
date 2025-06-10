import prismaClient from "../../prisma";
import { hash } from "bcryptjs"; // Importando o hash do bcryptjs para criptografar a senha
import { CriarUsuarioInput } from "../../validations/schemas";

// interface UserRequest {
//   nome: string;
//   email: string;
//   senha: string;
//   dataNascimento: string;
// }

// faz a logica de negocio no banco de dados
class CriarUsuarioService {
  async execute({ nome, email, senha, dataNascimento }: CriarUsuarioInput) {
    // verifica se ele enviou um email
    if (!email) {
      throw new Error("Email incorreto");
    }

    // verificar se o email ja existe na plataforma
    const usuarioExistente = await prismaClient.usuario.findFirst({
      where: {
        email: email, // verifica se o email recebido é igual a algum email do banco de dados
      },
    });

    if (usuarioExistente) {
      throw new Error("Usuario ja existe");
    }

    // Verifica se existe algum usuário cadastrado no banco
    const totalUsuarios = await prismaClient.usuario.count();
    const isAdmin = totalUsuarios === 0; // true se for adm, false se for usuario comum

    const senhaHash = await hash(senha, 8);

    //cadastro do usuario
    const usuario = await prismaClient.usuario.create({
      data: {
        nome: nome,
        email: email,
        senha: senhaHash, //salvando a senha criptografada
        dataNascimento: dataNascimento,
        tipoUsuario: isAdmin,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    // retorna o usuario criado para o controller
    return usuario;
  }
}

export { CriarUsuarioService };
