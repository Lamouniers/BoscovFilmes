
import swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BoscovFilmes Swagger",
      version: "1.0.0",
      description: "Documentação Swagger",
    },
    servers: [
      {
        url: "http://localhost:3002",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs;
