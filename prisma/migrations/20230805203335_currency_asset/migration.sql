/*
  Warnings:

  - You are about to drop the `CurrencyPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CurrencyPrice";

-- CreateTable
CREATE TABLE "currency_assets" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "open" DECIMAL(10,5) NOT NULL,
    "high" DECIMAL(10,5) NOT NULL,
    "low" DECIMAL(10,5) NOT NULL,
    "close" DECIMAL(10,5) NOT NULL,
    "volume" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,

    CONSTRAINT "currency_assets_pkey" PRIMARY KEY ("id")
);
