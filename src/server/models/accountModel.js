const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const updateAccount = async (account) => {
    try {
        const updatedAccount = await prisma.accounts.update({
            where: {
                account_id: account.account_id,
            },
            data: {
                current_balance: account.current_balance,
                profit_and_loss: account.profit_and_loss,
                profit_and_loss_percent: account.profit_and_loss_percent,
                orders: account.orders
            }
        });
        return updatedAccount;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be handled later
    }
};



const getAccountsFromUserId = async (user_id) => {
    try {
        const accounts = await prisma.accounts.findMany({
            where: {
                user_id: user_id,
            },
        });

        return accounts;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAccountFromAccountId = async (account_id) => {
    try {
        const account = await prisma.accounts.findUnique({
            where: {
                account_id: account_id,
            },
        });
        return account;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const insertAccount = async (account) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                user_email: account.user
            }
        });

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        const newAccount = await prisma.accounts.create({
            data: {
                user_id: user.user_id,
                strategy: account.strategy,
                devise: account.devise,
                initiale_balance: account.initiale_balance,
                current_balance: account.initiale_balance,
                shared: false,
                profit_and_loss: 0,
                profit_and_loss_percent: 0,
                orders: 0
            },
        });

        return newAccount;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const accountModel = {
    insertAccount,
    getAccountsFromUserId,
    getAccountFromAccountId,
    updateAccount
};
