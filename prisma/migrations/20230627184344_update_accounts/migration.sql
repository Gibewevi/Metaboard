/*
  Warnings:

  - You are about to alter the column `winrate` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `winrate` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "winrate" SET NOT NULL,
ALTER COLUMN "winrate" SET DATA TYPE INTEGER;
