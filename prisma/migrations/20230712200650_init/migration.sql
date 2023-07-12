/*
  Warnings:

  - You are about to drop the column `accountId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_accountId_fkey";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "orders" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "accountId",
ADD COLUMN     "account_id" INTEGER NOT NULL;
