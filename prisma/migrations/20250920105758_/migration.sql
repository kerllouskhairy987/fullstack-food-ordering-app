/*
  Warnings:

  - You are about to drop the column `quantity` on the `Extra` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Extra" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "public"."UserProducts" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
