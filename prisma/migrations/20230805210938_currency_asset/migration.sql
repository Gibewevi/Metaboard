/*
  Warnings:

  - You are about to drop the column `Time` on the `currency_assets` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `currency_assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currency_assets" DROP COLUMN "Time",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
