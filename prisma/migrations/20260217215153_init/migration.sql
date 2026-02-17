-- CreateEnum
CREATE TYPE "NivelConhecimento" AS ENUM ('BASICO', 'INTERMEDIARIO', 'AVANCADO');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conhecimentos" (
    "id" TEXT NOT NULL,
    "tituloConhecimento" VARCHAR(300) NOT NULL,
    "descricao" TEXT NOT NULL,
    "nivel" "NivelConhecimento" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "conhecimentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "conhecimentos" ADD CONSTRAINT "conhecimentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
