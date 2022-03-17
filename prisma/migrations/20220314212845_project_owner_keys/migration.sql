/*
  Warnings:

  - A unique constraint covering the columns `[ownerName,name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerEntityId,name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_ownerName_name_key" ON "Project"("ownerName", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_ownerEntityId_name_key" ON "Project"("ownerEntityId", "name");
