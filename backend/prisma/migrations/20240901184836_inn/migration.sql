/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateEnum
CREATE TYPE "mealtype" AS ENUM ('breakfast', 'lunch', 'dinner');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "mealType" "mealtype" NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
