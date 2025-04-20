/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Shift` table. All the data in the column will be lost.
  - Added the required column `authId` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_employeeId_fkey";

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "employeeId",
ADD COLUMN     "authId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("authId") ON DELETE RESTRICT ON UPDATE CASCADE;
