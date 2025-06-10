/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `Genero` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Genero_descricao_key" ON "Genero"("descricao");
