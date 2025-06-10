-- DropForeignKey
ALTER TABLE "Avaliacao" DROP CONSTRAINT "Avaliacao_usuario_id_fkey";

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
