-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_auth_id_fkey";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "Auth"("auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;
