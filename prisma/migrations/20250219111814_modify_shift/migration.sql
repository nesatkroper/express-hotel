/*
  Warnings:

  - You are about to drop the `CloseShift` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenShift` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shift_id` to the `BankNote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CloseShift" DROP CONSTRAINT "CloseShift_bank_note_id_fkey";

-- DropForeignKey
ALTER TABLE "CloseShift" DROP CONSTRAINT "CloseShift_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "OpenShift" DROP CONSTRAINT "OpenShift_bank_note_id_fkey";

-- DropForeignKey
ALTER TABLE "OpenShift" DROP CONSTRAINT "OpenShift_employee_id_fkey";

-- AlterTable
ALTER TABLE "BankNote" ADD COLUMN     "shift_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CloseShift";

-- DropTable
DROP TABLE "OpenShift";

-- CreateTable
CREATE TABLE "Shift" (
    "shift_id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "shift_code" TEXT NOT NULL,
    "open_khmer_riel" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "open_us_dollar" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "open_time" TIMESTAMP(3),
    "close_khmer_riel" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "close_us_dollar" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "close_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("shift_id")
);

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankNote" ADD CONSTRAINT "BankNote_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "Shift"("shift_id") ON DELETE RESTRICT ON UPDATE CASCADE;
