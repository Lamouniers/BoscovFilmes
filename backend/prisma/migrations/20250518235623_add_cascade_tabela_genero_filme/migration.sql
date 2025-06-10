-- DropForeignKey
ALTER TABLE "GeneroFilme" DROP CONSTRAINT "GeneroFilme_filme_id_fkey";

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
