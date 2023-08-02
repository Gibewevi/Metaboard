/*
  Warnings:

  - You are about to alter the column `open` on the `accounts_orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,4)`.
  - You are about to alter the column `close` on the `accounts_orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,4)`.

*/
-- AlterTable
ALTER TABLE "accounts_orders" ALTER COLUMN "open" SET DATA TYPE DECIMAL(10,4),
ALTER COLUMN "close" SET DATA TYPE DECIMAL(10,4);
