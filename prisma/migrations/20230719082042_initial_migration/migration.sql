/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_account_id_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "favorites";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "users_credentials" (
    "user_id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "users_credentials_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users_accounts" (
    "account_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "strategy" TEXT NOT NULL,
    "devise" TEXT NOT NULL,
    "initial_balance" DECIMAL(10,2) NOT NULL,
    "current_balance" DECIMAL(10,2) NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "profit_and_loss" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "profit_and_loss_percent" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "winning_trades" INTEGER NOT NULL DEFAULT 0,
    "losing_trades" INTEGER NOT NULL DEFAULT 0,
    "orders_number" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "favorites_accounts" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "favorites_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts_orders" (
    "order_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "asset" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "open" DECIMAL(10,2) NOT NULL,
    "close" DECIMAL(10,2) NOT NULL,
    "closed_date" TIMESTAMP(3),
    "profit" DECIMAL(10,2) NOT NULL,
    "stop_loss" DECIMAL(10,2) NOT NULL,
    "risk" DECIMAL(10,2) NOT NULL,
    "risk_percent" DECIMAL(10,2) NOT NULL,
    "risk_method" VARCHAR(255) NOT NULL,
    "profit_percent" DECIMAL(10,2) NOT NULL,
    "risk_reward" DECIMAL(10,2) NOT NULL,
    "picture" TEXT,

    CONSTRAINT "accounts_orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_credentials_user_email_key" ON "users_credentials"("user_email");

-- AddForeignKey
ALTER TABLE "accounts_orders" ADD CONSTRAINT "accounts_orders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "users_accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
