/*
  Warnings:

  - You are about to drop the column `name` on the `List` table. All the data in the column will be lost.
  - Added the required column `title` to the `List` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `visibility` on the `List` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('Public', 'Unlisted', 'Private');

-- AlterTable
ALTER TABLE "List" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "visibility",
ADD COLUMN     "visibility" "Visibility" NOT NULL;

-- DropEnum
DROP TYPE "Visiblity";
