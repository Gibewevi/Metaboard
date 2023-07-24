/*
  Warnings:

  - You are about to drop the column `entry_date` on the `users_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `exit_date` on the `users_accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_accounts" DROP COLUMN "entry_date",
DROP COLUMN "exit_date";
