/*
  Warnings:

  - You are about to alter the column `initiale_balance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `current_balance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `profit_and_loss` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `profit_and_loss_percent` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `open` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `close` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `profit` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `stop_loss` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `profit_percent` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "initiale_balance" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "current_balance" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "profit_and_loss" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "profit_and_loss_percent" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "open" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "close" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "profit" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "stop_loss" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "profit_percent" SET DATA TYPE DECIMAL(10,2);
