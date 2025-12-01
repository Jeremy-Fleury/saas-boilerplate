-- AlterTable
ALTER TABLE "Example" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
