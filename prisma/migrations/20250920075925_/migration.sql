/*
  Warnings:

  - You are about to drop the `UserProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserProducts" DROP CONSTRAINT "UserProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProducts" DROP CONSTRAINT "UserProducts_userId_fkey";

-- DropTable
DROP TABLE "public"."UserProducts";
