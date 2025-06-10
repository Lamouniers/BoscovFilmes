import prismaClient from "../../prisma";
import { compare } from "bcryptjs"; // para comparar a senha que o usuario digitou com a senha que esta no banco de dados
import { sign } from "jsonwebtoken"; // para gerar o token de autenticação
import { AutenticacaoInput } from "../../validations/schemas";

// interface AutenticacaoRequest {
//   email: string;
//   senha: string;
// }

class AutenticacaoUsuarioService {
  async execute({ email, senha }: AutenticacaoInput) {
    // verifica se ele enviou um email
    if (!email) {
      throw new Error("Email incorreto");
    }

    // verificar se o email ja existe na plataforma
    const usuario = await prismaClient.usuario.findFirst({
      where: {
        email: email, // verifica se o email recebido é igual a algum email do banco de dados
      },
    });

    if (!usuario) {
      throw new Error("Usuario/senha incorretos");
    }

    // verificar se a senha esta correta
    const senhaCorreta = await compare(senha, usuario.senha);

    if (!senhaCorreta) {
      throw new Error("Usuario/senha incorretos");
    }

    //gerar o token de autenticação JWT para o usuario
    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email,
        status: usuario.status,
        tipoUsuario: usuario.tipoUsuario,
      },
      process.env.JWT_SECRET, // chave secreta para gerar o token
      {
        subject: String(usuario.id),
        expiresIn: "1d", // tempo de expiração do token
      }
    );

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      status: usuario.status,
      tipoUsuario: usuario.tipoUsuario,
      token: token, // retorna o token para o controller
    };
  }
}

export { AutenticacaoUsuarioService };
