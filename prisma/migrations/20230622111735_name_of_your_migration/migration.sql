/*
  Warnings:

  - You are about to drop the column `profit_pourcent` on the `orders` table. All the data in the column will be lost.
  - Added the required column `profit_percent` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "profit_pourcent",
ADD COLUMN     "profit_percent" DECIMAL(65,30) NOT NULL;
