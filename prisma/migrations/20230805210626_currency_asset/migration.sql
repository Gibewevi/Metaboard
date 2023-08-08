/*
  Warnings:

  - You are about to drop the column `close` on the `currency_assets` table. All the data in the column will be lost.
  - You are about to drop the column `high` on the `currency_assets` table. All the data in the column will be lost.
  - You are about to drop the column `low` on the `currency_assets` table. All the data in the column will be lost.
  - You are about to drop the column `open` on the `currency_assets` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `currency_assets` table. All the data in the column will be lost.
  - You are about to drop the column `volume` on the `currency_assets` table. All the data in the column will be lost.
  - Added the required column `Close` to the `currency_assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `High` to the `currency_assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Low` to the `currency_assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Open` to the `currency_assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Time` to the `currency_assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Volume` to the `currency_assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currency_assets" DROP COLUMN "close",
DROP COLUMN "high",
DROP COLUMN "low",
DROP COLUMN "open",
DROP COLUMN "timestamp",
DROP COLUMN "volume",
ADD COLUMN     "Close" DECIMAL(10,5) NOT NULL,
ADD COLUMN     "High" DECIMAL(10,5) NOT NULL,
ADD COLUMN     "Low" DECIMAL(10,5) NOT NULL,
ADD COLUMN     "Open" DECIMAL(10,5) NOT NULL,
ADD COLUMN     "Time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Volume" INTEGER NOT NULL;
