-- CreateTable
CREATE TABLE "accounts_likes" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "accounts_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_likes_account_id_user_id_key" ON "accounts_likes"("account_id", "user_id");
