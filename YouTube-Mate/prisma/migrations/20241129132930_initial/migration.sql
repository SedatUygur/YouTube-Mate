/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "expiresIn",
ADD COLUMN     "expiresAt" INTEGER;
