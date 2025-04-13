-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "deviceInfo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "ipAddress" TEXT NOT NULL DEFAULT '';
