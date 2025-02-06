/*
  Warnings:

  - You are about to drop the column `account_status` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Employee` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('active', 'pending', 'fired');

-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "account_status",
DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "email",
DROP COLUMN "picture",
DROP COLUMN "state",
ADD COLUMN     "status" "EmployeeStatus" NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE "EmployeeInfo" (
    "info_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "picture" TEXT,
    "region" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "note" TEXT,

    CONSTRAINT "EmployeeInfo_pkey" PRIMARY KEY ("info_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeInfo_employee_id_key" ON "EmployeeInfo"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeInfo_email_key" ON "EmployeeInfo"("email");

-- AddForeignKey
ALTER TABLE "EmployeeInfo" ADD CONSTRAINT "EmployeeInfo_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
