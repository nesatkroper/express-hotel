/*
  Warnings:

  - Made the column `departmentName` on table `Department` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Groupmessage" DROP CONSTRAINT "Groupmessage_employeeId_fkey";

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "departmentName" SET NOT NULL;

-- AlterTable
ALTER TABLE "Groupmessage" ALTER COLUMN "employeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Groupmessage" ADD CONSTRAINT "Groupmessage_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;
