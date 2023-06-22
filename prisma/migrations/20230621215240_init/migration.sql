-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "account_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "strategy" TEXT NOT NULL,
    "devise" TEXT NOT NULL,
    "initiale_balance" INTEGER NOT NULL,
    "current_balance" INTEGER NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "profit_and_loss" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "profit_and_loss_percent" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "orders" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "asset" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "open" DECIMAL(65,30) NOT NULL,
    "close" DECIMAL(65,30) NOT NULL,
    "closed_date" TIMESTAMP(3),
    "profit" DECIMAL(65,30) NOT NULL,
    "stop_loss" DECIMAL(65,30) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "profit_pourcent" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");
