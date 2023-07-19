const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFavoriteAccountByUserId = async (userId) => {
    try {
        const favoriteAccounts = await prisma.favorites_accounts.findMany({
            where: {
                user_id: userId,
            },
            include: {
                account: true, // Include related account data
            },
        });

        return favoriteAccounts;
    } catch (error) {
        console.error("Erreur lors de la récupération des comptes favoris : ", error);
        throw error;
    }
};

const getSharedAccounts = async (userId) => {
    try {
        const favoritedAccountIds = await prisma.favorites_accounts.findMany({
            where: {
                user_id: userId,
            },
            select: {
                account_id: true,
            },
        });

        const favoritedAccountIdsSet = new Set(
            favoritedAccountIds.map((favorite) => favorite.account_id)
        );

        const accounts = await prisma.users_accounts.findMany({
            where: {
                shared: true,
            },
        });

        return accounts.map((account) => ({
            ...account,
            isFavoritedByUser: favoritedAccountIdsSet.has(account.account_id),
        }));
    } catch (error) {
        // Gérez l'erreur ici
    }
};


const changeSharedAccountStatus = async (accountId) => {

    try {
        // Obtenir d'abord le compte pour avoir accès à l'attribut 'shared'
        const account = await prisma.users_accounts.findUnique({
            where: {
                account_id: accountId,
            },
        });

        if (!account) throw new Error('Account not found');

        // Mettre à jour le compte
        const sharedAccount = await prisma.users_accounts.update({
            where: {
                account_id: accountId,
            },
            data: {
                shared: !account.shared,
            },
        });

        return sharedAccount.shared;

    } catch (error) {
        // Gérer l'erreur ici, par exemple en l'imprimant à la console
        console.error(error);
    };
};


const updateAccount = async (account) => {
    try {
        const updatedAccount = await prisma.users_accounts.update({
            where: {
                account_id: account.account_id,
            },
            data: {
                current_balance: account.current_balance,
                profit_and_loss: account.profit_and_loss,
                profit_and_loss_percent: account.profit_and_loss_percent,
                orders_number: account.orders_number,
                losing_trades: account.losing_trades,
                winning_trades: account.winning_trades,
                likes: account.likes
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
        const accounts = await prisma.users_accounts.findMany({
            where: {
                user_id: user_id,
            },
            orderBy: {
                account_id: 'asc',
            },
            include: {
                orders: false, // Inclure les ordres
            }
        });

        return accounts;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getAccountFromAccountId = async (account_id) => {
    try {
        const account = await prisma.users_accounts.findUnique({
            where: {
                account_id: account_id,
            },
            include: {
                orders: false, // Inclure les ordres
            }
        });
        return account;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const insertAccount = async (account) => {
    try {
        const user = await prisma.users_credentials.findUnique({
            where: {
                user_email: account.user
            }
        });

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        const newAccount = await prisma.users_accounts.create({
            data: {
                user_id: user.user_id,
                strategy: account.strategy,
                devise: account.devise,
                initial_balance: account.initial_balance,
                current_balance: account.initial_balance,
                shared: false,
                profit_and_loss: 0,
                profit_and_loss_percent: 0,
                orders_number: 0,
                likes: 0,
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
    updateAccount,
    changeSharedAccountStatus,
    getSharedAccounts,
    getFavoriteAccountByUserId
};
