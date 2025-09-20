-- AlterTable
ALTER TABLE "public"."UserProducts" ADD COLUMN     "sizeId" TEXT;

-- CreateTable
CREATE TABLE "public"."_ExtraToUserProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExtraToUserProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExtraToUserProducts_B_index" ON "public"."_ExtraToUserProducts"("B");

-- AddForeignKey
ALTER TABLE "public"."UserProducts" ADD CONSTRAINT "UserProducts_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ExtraToUserProducts" ADD CONSTRAINT "_ExtraToUserProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ExtraToUserProducts" ADD CONSTRAINT "_ExtraToUserProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."UserProducts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
