import prismaClient from "../../prisma";

class DetalhesUsuarioService {
    async execute(user_id: string) {

        const user = await prismaClient.usuario.findFirst({
            where: {
                id: parseInt(user_id)
            },
            select: {
                id: true,
                nome: true,
                email: true,
                status: true,
                tipoUsuario: true,
            }
        });

        return user; //retorna o usuario que foi encontrado no banco
    }
}

export { DetalhesUsuarioService };