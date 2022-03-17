-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
