/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `OwnerEntity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,name]` on the table `OwnerEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "public" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerEntityId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Node_id_key" ON "Node"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerEntity_id_key" ON "OwnerEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerEntity_id_name_key" ON "OwnerEntity"("id", "name");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerEntityId_ownerName_fkey" FOREIGN KEY ("ownerEntityId", "ownerName") REFERENCES "OwnerEntity"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
