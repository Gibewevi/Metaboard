/*
  Warnings:

  - A unique constraint covering the columns `[account_id,user_id]` on the table `favorites_accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorites_accounts_account_id_user_id_key" ON "favorites_accounts"("account_id", "user_id");
