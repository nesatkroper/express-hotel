/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Groupmessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Groupmessage" DROP CONSTRAINT "Groupmessage_employeeId_fkey";

-- AlterTable
ALTER TABLE "Groupmessage" DROP COLUMN "employeeId",
ADD COLUMN     "authId" UUID;

-- AddForeignKey
ALTER TABLE "Groupmessage" ADD CONSTRAINT "Groupmessage_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("authId") ON DELETE SET NULL ON UPDATE CASCADE;
