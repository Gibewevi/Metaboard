/*
  Warnings:

  - You are about to drop the column `amount` on the `orders` table. All the data in the column will be lost.
  - Added the required column `risk` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `risk_method` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "amount",
ADD COLUMN     "risk" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "risk_method" VARCHAR(255) NOT NULL;
