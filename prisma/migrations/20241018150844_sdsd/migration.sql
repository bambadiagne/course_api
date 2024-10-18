-- CreateEnum
CREATE TYPE "Level" AS ENUM ('DEBUTANT', 'INTERMEDIAIRE', 'AVANCE');

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" "Level" NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
