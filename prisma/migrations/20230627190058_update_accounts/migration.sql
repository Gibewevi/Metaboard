/*
  Warnings:

  - You are about to drop the column `initiale_balance` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `winrate` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `initial_balance` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "initiale_balance",
DROP COLUMN "winrate",
ADD COLUMN     "initial_balance" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "losing_trades" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "winning_trades" INTEGER NOT NULL DEFAULT 0;
