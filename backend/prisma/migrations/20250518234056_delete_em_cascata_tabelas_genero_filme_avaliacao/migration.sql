-- DropForeignKey
ALTER TABLE "Avaliacao" DROP CONSTRAINT "Avaliacao_filme_id_fkey";

-- DropForeignKey
ALTER TABLE "GeneroFilme" DROP CONSTRAINT "GeneroFilme_genero_id_fkey";

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_genero_id_fkey" FOREIGN KEY ("genero_id") REFERENCES "Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
