/*
  Warnings:

  - Added the required column `risk_percent` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "risk_percent" DECIMAL(10,2) NOT NULL;
