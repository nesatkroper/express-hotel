/*
  Warnings:

  - The values [available,unavailable] on the enum `AccountStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountStatus_new" AS ENUM ('active', 'dormant');
ALTER TABLE "Customer" ALTER COLUMN "account_status" DROP DEFAULT;
ALTER TABLE "Customer" ALTER COLUMN "account_status" TYPE "AccountStatus_new" USING ("account_status"::text::"AccountStatus_new");
ALTER TYPE "AccountStatus" RENAME TO "AccountStatus_old";
ALTER TYPE "AccountStatus_new" RENAME TO "AccountStatus";
DROP TYPE "AccountStatus_old";
ALTER TABLE "Customer" ALTER COLUMN "account_status" SET DEFAULT 'active';
COMMIT;

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "account_status" SET DEFAULT 'active';
