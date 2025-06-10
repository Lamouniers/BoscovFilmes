import express, { Request, Response, NextFunction } from "express"; // Importando o express
import "express-async-errors"; 
import cors from "cors";
import  {router}  from "./routes/routes"; // Importando as rotas
import path from "path";
import swaggerUi from "swagger-ui-express"; // Importando o Swagger UI para documentação da API
import swaggerDocs from "../swaggerConfig";


//import prisma from "./prisma/prismaClient.js";

const app = express();
app.use(express.json()); //formato utilizado para enviar os dados para o servidor
app.use(cors()); // Habilitando o CORS para permitir requisições de outros domínios

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router); // Rota para criar um novo usuário. Todas as rotas estão no arquivo routes.js

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp"))); // Rota para servir arquivos estáticos (imagens, vídeos, etc.) da pasta tmp
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // Se for uma instância do tipo error
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});


// Iniciar o servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação da API disponível em http://localhost:${PORT}/api-docs`);
});
