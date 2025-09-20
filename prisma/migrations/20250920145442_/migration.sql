/*
  Warnings:

  - You are about to drop the `UserProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserProductsExtras` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserProducts" DROP CONSTRAINT "UserProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProducts" DROP CONSTRAINT "UserProducts_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProducts" DROP CONSTRAINT "UserProducts_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserProductsExtras" DROP CONSTRAINT "_UserProductsExtras_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserProductsExtras" DROP CONSTRAINT "_UserProductsExtras_B_fkey";

-- DropTable
DROP TABLE "public"."UserProducts";

-- DropTable
DROP TABLE "public"."_UserProductsExtras";
