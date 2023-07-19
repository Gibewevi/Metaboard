-- AddForeignKey
ALTER TABLE "favorites_accounts" ADD CONSTRAINT "favorites_accounts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "users_accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
