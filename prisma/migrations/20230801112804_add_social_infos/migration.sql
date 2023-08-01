/*
  Warnings:

  - You are about to drop the column `favoris` on the `users_accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_accounts" DROP COLUMN "favoris",
ADD COLUMN     "favoriteCount" INTEGER NOT NULL DEFAULT 0;
