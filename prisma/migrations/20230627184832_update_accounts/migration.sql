/*
  Warnings:

  - You are about to drop the column `initial_balance` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `initiale_balance` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "initial_balance",
ADD COLUMN     "initiale_balance" DECIMAL(10,2) NOT NULL;
