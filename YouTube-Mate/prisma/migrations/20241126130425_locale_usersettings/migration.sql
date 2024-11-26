-- CreateEnum
CREATE TYPE "ColorScheme" AS ENUM ('System', 'Dark', 'Light');

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "colorScheme" "ColorScheme" NOT NULL DEFAULT 'System',
    "userId" UUID NOT NULL,
    "localeId" VARCHAR(15) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locale" (
    "id" VARCHAR(15) NOT NULL,
    "languageCode" TEXT NOT NULL,
    "countryCode" TEXT,
    "script" TEXT,
    "formalName" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL,
    "commonName" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Locale_id_key" ON "Locale"("id");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_localeId_fkey" FOREIGN KEY ("localeId") REFERENCES "Locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
