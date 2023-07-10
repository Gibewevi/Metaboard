/*
  Warnings:

  - You are about to alter the column `risk_reward` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - Made the column `risk_reward` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "risk_reward" SET NOT NULL,
ALTER COLUMN "risk_reward" SET DATA TYPE DECIMAL(10,2);
