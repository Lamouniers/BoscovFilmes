import prismaClient from "../../prisma";

interface AtualizarFilmeRequest {
  user_id: number;
  id_filme: number;
  nome: string;
  diretor?: string;
  anoLancamento?: string;
  duracao?: number;
  produtora?: string;
  classificacao?: string;
  poster?: string;
}

class AtualizarFilmeService {
  async execute({ user_id, id_filme, nome, diretor, anoLancamento, duracao, produtora, classificacao, poster }: AtualizarFilmeRequest) {
    // Verifica se o filme existe para poder ser atualizado

    console.log("Dados recebidos no serviço:", {
      user_id,
      id_filme,
      nome,
      diretor,
      anoLancamento,
      duracao,
      produtora,
      classificacao,
      poster,
    });
    
    const filme = await prismaClient.filme.findUnique({
      where: {
        id: id_filme,
      },
    });

    if (!filme) {
      throw new Error("Filme não encontrado");
    }

    // Verifica se o usuário logado é um administrador
    if (isNaN(user_id)) {
      throw new Error("ID do usuário inválido");
    }

    const usuario = await prismaClient.usuario.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!usuario.tipoUsuario) {
      throw new Error("Você não tem permissão para atualizar este filme");
    }    

    // Verifica se ja existe um filme com o mesmo nome e ano de lançamento
    //const filmeJaExiste = await prismaClient.filme.findFirst({
    //  where: {
    //    nome: nome,
    //    anoLancamento: anoLancamento,
    //  },
    //});


    //if (filmeJaExiste) {
    //  throw new Error("Filme já cadastrado");
    //}

    // Atualiza os dados do filme
    const filmeAtualizado = await prismaClient.filme.update({
      where: { id: id_filme },
      data: {
        nome: nome !== undefined ? nome : filme.nome, // Mantém o atual se não for enviado
        diretor: diretor,
        anoLancamento: anoLancamento,
        duracao: duracao,
        produtora: produtora,
        classificacao: classificacao,
        poster: poster !== undefined ? poster : filme.poster,
      },
    });

    return filmeAtualizado;
  }
}

export { AtualizarFilmeService };