import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Converte o campo 'generos' de string JSON para array, se necessário
      if (typeof req.body.generos === "string") {
        req.body.generos = JSON.parse(req.body.generos);
      }
      console.log("Dados recebidos no middleware de validação:", req.body);
      // Corrige a forma como os dados são passados para o schema
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Formata os erros para um formato mais amigável
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        console.error("Erro de validação:", errors);
        return res.status(400).json({ errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };