-- CreateTable
CREATE TABLE "CartNote" (
    "note_id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "CartNote_pkey" PRIMARY KEY ("note_id")
);

-- AddForeignKey
ALTER TABLE "CartNote" ADD CONSTRAINT "CartNote_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;
