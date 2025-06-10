import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"; // para verificar se o token que foi gerado ao logar o usuario é valido

interface Payload {
  sub: string; // id do usuario
};

function AutenticacaoMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

    //receber o token
    const tokenAutenticado = req.headers.authorization; //ele sempre vem no header

    if (!tokenAutenticado) {
        return res.status(401).end(); // se não tiver token, barra o acesso
    }

    const [, token] = tokenAutenticado.split(" "); // o token vem no formato Bearer-token, então é preciso separar o Bearer do token

    try {
        //verifica se o token é valido
        const sub = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload; //garante que o token venha com o id do usuario

        req.user_id = sub.sub; // recupera o id do token e coloca dentro de uma variavel user_id dentro do request
        
        return next();

    } catch (err) {
        return res.status(401).end(); // se o token não for valido, barra o acesso retornando 1
    }

  
}

export { AutenticacaoMiddleware };
