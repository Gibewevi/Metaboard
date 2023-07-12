/*
  Warnings:

  - You are about to drop the column `orders` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "orders";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "account_id",
ADD COLUMN     "accountId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
