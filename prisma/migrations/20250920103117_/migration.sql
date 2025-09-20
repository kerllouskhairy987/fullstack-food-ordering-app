/*
  Warnings:

  - You are about to drop the `_ExtraToUserProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_ExtraToUserProducts" DROP CONSTRAINT "_ExtraToUserProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ExtraToUserProducts" DROP CONSTRAINT "_ExtraToUserProducts_B_fkey";

-- DropTable
DROP TABLE "public"."_ExtraToUserProducts";

-- CreateTable
CREATE TABLE "public"."_UserProductsExtras" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserProductsExtras_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserProductsExtras_B_index" ON "public"."_UserProductsExtras"("B");

-- AddForeignKey
ALTER TABLE "public"."_UserProductsExtras" ADD CONSTRAINT "_UserProductsExtras_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserProductsExtras" ADD CONSTRAINT "_UserProductsExtras_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."UserProducts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
