-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'USER';
