/*
  Warnings:

  - You are about to drop the column `favoriteCount` on the `users_accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_accounts" DROP COLUMN "favoriteCount",
ADD COLUMN     "favorite_count" INTEGER NOT NULL DEFAULT 0;
