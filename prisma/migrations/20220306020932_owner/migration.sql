-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('USER', 'TEAM');

-- CreateTable
CREATE TABLE "OwnerEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OwnerType" NOT NULL,

    CONSTRAINT "OwnerEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OwnerEntity_name_key" ON "OwnerEntity"("name");
