/*
  Warnings:

  - You are about to drop the column `formId` on the `ArtPiece` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `ArtForm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `form` to the `ArtPiece` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArtPiece" DROP CONSTRAINT "ArtPiece_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ArtPiece" DROP CONSTRAINT "ArtPiece_formId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "ArtPiece" DROP COLUMN "formId",
ADD COLUMN     "form" TEXT NOT NULL,
ALTER COLUMN "createdById" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "ArtForm";

-- AddForeignKey
ALTER TABLE "ArtPiece" ADD CONSTRAINT "ArtPiece_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
