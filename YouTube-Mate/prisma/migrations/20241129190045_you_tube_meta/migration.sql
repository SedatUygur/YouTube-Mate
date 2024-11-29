/*
  Warnings:

  - Added the required column `imageUrl` to the `ListItemMeta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListItemMeta" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "youTubeMetaOriginId" TEXT;

-- CreateTable
CREATE TABLE "YouTubeMeta" (
    "originId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subscriberCount" INTEGER NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "bannerUrl" TEXT,
    "customUrl" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeMeta_originId_key" ON "YouTubeMeta"("originId");

-- AddForeignKey
ALTER TABLE "ListItemMeta" ADD CONSTRAINT "ListItemMeta_youTubeMetaOriginId_fkey" FOREIGN KEY ("youTubeMetaOriginId") REFERENCES "YouTubeMeta"("originId") ON DELETE SET NULL ON UPDATE CASCADE;
