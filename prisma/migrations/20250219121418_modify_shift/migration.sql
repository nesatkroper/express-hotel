/*
  Warnings:

  - Made the column `open_time` on table `Shift` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shift" ALTER COLUMN "open_time" SET NOT NULL,
ALTER COLUMN "open_time" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "close_khmer_riel" DROP NOT NULL,
ALTER COLUMN "close_us_dollar" DROP NOT NULL;
