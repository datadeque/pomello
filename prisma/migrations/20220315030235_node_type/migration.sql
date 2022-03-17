/*
  Warnings:

  - Added the required column `type` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('BAR', 'PIE');

-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "type" "NodeType" NOT NULL;
