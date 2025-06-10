
import prismaClient from "../../prisma";

interface FilmeRequest {
  user_id: number;
  nome: string;
  diretor: string;
  anoLancamento: string;
  duracao: number;
  produtora: string;
  classificacao: string;
  poster: string;
  generos: string[]; //array de ids de generos
}

class CriarFilmeService {
  async execute({
    user_id,
    nome,
    diretor,
    anoLancamento,
    duracao,
    produtora,
    classificacao,
    poster,
    generos,
  }: FilmeRequest) {

    // Verifica se o usuário logado é um administrador
    const usuario = await prismaClient.usuario.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!usuario.tipoUsuario) {
      throw new Error("Você não tem permissão para criar filmes");
    }

    // // Verifica se o filme já existe
    // const filmeJaExiste = await prismaClient.filme.findFirst({
    //   where: {
    //     nome: nome,
    //     anoLancamento: anoLancamento,
    //   },
    // });

    // if (filmeJaExiste) {
    //   throw new Error("Filme já cadastrado");
    // }

    // Cria o filme e conecta os gêneros
    try {
      const filme = await prismaClient.filme.create({
        data: {
          nome,
          diretor,
          anoLancamento,
          duracao,
          produtora,
          classificacao,
          poster,
          generos: {
            create: await Promise.all(
              generos.map(async (descricao) => {
                // Verifica se o gênero já existe
                let genero = await prismaClient.genero.findUnique({
                  where: { descricao },
                });

                // Se não existir, cria o gênero
                if (!genero) {
                  genero = await prismaClient.genero.create({
                    data: { descricao },
                  });
                }

                // Retorna o objeto para criar o relacionamento
                return {
                  genero: { connect: { id: genero.id } },
                };
              })
            ),
          },
        },
        include: {
          generos: {
            include: {
              genero: true,
            },
          },
        },
      });
      return { filme };
    } catch (error) {
      throw new Error(
        `Erro ao criar filme - verifique os gêneros selecionados ${error}`
      );
    }
  }
};

export { CriarFilmeService };
