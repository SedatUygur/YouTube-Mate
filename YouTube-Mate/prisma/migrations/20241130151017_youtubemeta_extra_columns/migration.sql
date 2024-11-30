/*
  Warnings:

  - Added the required column `videoCount` to the `YouTubeMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewCount` to the `YouTubeMeta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "YouTubeMeta" ADD COLUMN     "countryCode" TEXT,
ADD COLUMN     "favoritesPlaylist" TEXT,
ADD COLUMN     "likesPlaylist" TEXT,
ADD COLUMN     "uploadsPlaylist" TEXT,
ADD COLUMN     "videoCount" INTEGER NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL,
ADD COLUMN     "watchHistoryPlaylist" TEXT,
ADD COLUMN     "watchLaterPlaylist" TEXT;
