/*
  Warnings:

  - A unique constraint covering the columns `[slug,userId]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "List_slug_userId_key" ON "List"("slug", "userId");
