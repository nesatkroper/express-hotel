/*
  Warnings:

  - You are about to drop the column `discount_rate` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "discount_rate",
DROP COLUMN "total";
