-- CreateTable
CREATE TABLE "CurrencyPrice" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "open" DECIMAL(10,5) NOT NULL,
    "high" DECIMAL(10,5) NOT NULL,
    "low" DECIMAL(10,5) NOT NULL,
    "close" DECIMAL(10,5) NOT NULL,
    "volume" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,

    CONSTRAINT "CurrencyPrice_pkey" PRIMARY KEY ("id")
);
