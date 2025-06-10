-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "apelido" TEXT,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "tipoUsuario" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "diretor" TEXT NOT NULL,
    "anoLancamento" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "produtora" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" SERIAL NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "filme_id" INTEGER NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneroFilme" (
    "id" SERIAL NOT NULL,
    "genero_id" INTEGER NOT NULL,
    "filme_id" INTEGER NOT NULL,

    CONSTRAINT "GeneroFilme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_genero_id_fkey" FOREIGN KEY ("genero_id") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
