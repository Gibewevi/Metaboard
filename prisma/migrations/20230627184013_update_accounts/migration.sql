/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "accounts";

-- CreateTable
CREATE TABLE "Account" (
    "account_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "strategy" TEXT NOT NULL,
    "devise" TEXT NOT NULL,
    "initial_balance" DECIMAL(10,2) NOT NULL,
    "current_balance" DECIMAL(10,2) NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "profit_and_loss" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "profit_and_loss_percent" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "orders" INTEGER NOT NULL DEFAULT 0,
    "winrate" DOUBLE PRECISION,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);
