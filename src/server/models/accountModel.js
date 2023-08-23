const { PrismaClient } = require('@prisma/client');
import { calculations } from '../utils/calculations.js';
const prisma = new PrismaClient();

const updateOrderStats = (order, current_balance, account) => {
    let risk = calculations.calculateRiskAmount(order, account);
    let orderSize = calculations.calculateOrderSize(order, risk);
    let profitLoss = calculations.calculateTradeProfitLoss(order, orderSize);
    let profitLossPercentage = calculations.convertProfitLossToPercentage(profitLoss, current_balance);

    // Mettre à jour les statistiques de l'ordre
    order.risk = risk;
    order.profit = profitLoss;
    order.profit_percent = parseFloat(profitLossPercentage);

    // Mettre à jour le solde courant du compte
    current_balance = parseFloat((parseFloat(current_balance) + order.profit).toFixed(2));
    account.current_balance = current_balance;
    account.losing_trades += calculations.isNegative(order.profit);
    account.winning_trades += calculations.isPositive(order.profit);

    return order;
};

const updateAccountStats = async (accountId, orderId) => {
    return prisma.$transaction(async prisma => {
        // Supprime l'ordre spécifique
        await prisma.accounts_orders.delete({
            where: { order_id: orderId }
        });

        // Récupère le compte et tous les ordres liés à ce compte
        const account = await prisma.users_accounts.findUnique({
            where: { account_id: accountId },
            include: { orders: true }
        });

        // Réinitialise le solde courant du compte à son solde initial
        let current_balance = account.initial_balance;
        account.current_balance = current_balance;
        account.losing_trades = 0;
        account.winning_trades = 0;

        // Parcourez tous les ordres et mettez à jour les statistiques de chaque ordre
        const ordersToUpdate = account.orders.map(order => {
            return updateOrderStats(order, current_balance, account);
        });

        // Mettre à jour tous les ordres dans la base de données
        const updatedOrders = await Promise.all(ordersToUpdate.map(order =>
            prisma.accounts_orders.update({
                where: { order_id: order.order_id },
                data: { risk: order.risk, profit: order.profit, profit_percent: order.profit_percent }
            })
        ));

        account.profit_and_loss = account.current_balance - account.initial_balance;
        account.profit_and_loss_percent = (account.profit_and_loss / account.initial_balance) * 100;

        // Mettre à jour les statistiques du compte dans la base de données
        const updatedAccount = await prisma.users_accounts.update({
            where: { account_id: accountId },
            data: {
                current_balance: account.current_balance,
                profit_and_loss: account.profit_and_loss,
                profit_and_loss_percent: account.profit_and_loss_percent,
                orders_number: updatedOrders.length,
                losing_trades : account.losing_trades,
                winning_trades: account.winning_trades
            }
        });
        updatedAccount.orders = updatedOrders;
        return updatedAccount;
    });
};



async function getAccountWithOrders(accountId) {
    const account = await prisma.users_accounts.findUnique({
        where: { account_id: accountId },
        include: { orders: true }
    });

    return account;
}

const getEntryAndExitDateByAccountId = async (accountId) => {
    try {
        // Récupérez la commande la plus ancienne pour ce compte
        const firstOrder = await prisma.accounts_orders.findFirst({
            where: { account_id: accountId },
            orderBy: {
                closed_date: 'asc',
            },
        });

        // Récupérez la commande la plus récente pour ce compte
        const lastOrder = await prisma.accounts_orders.findFirst({
            where: { account_id: accountId },
            orderBy: {
                closed_date: 'desc',
            },
        });

        // Si aucune commande n'a été passée, retournez null pour les deux dates
        if (!firstOrder || !lastOrder) {
            return { entry_date: null, exit_date: null };
        }

        // La date d'entrée est la date de fermeture de la première commande
        const entry_date = firstOrder.closed_date;

        // La date de sortie est la date de fermeture de la dernière commande
        const exit_date = lastOrder.closed_date;

        return { entry_date, exit_date };
    } catch (error) {
        console.error(error);
        return null;
    }
};

const addLikeToUserAccount = async (accountId) => {
    try {
        const account = await prisma.users_accounts.update({
            where: { account_id: accountId },
            data: { likes: { increment: 1 } }
        });
        return account.likes;
    } catch (error) {
        throw new Error(`Failed to add like: ${error}`);
    }
};

const removeLikeFromUserAccount = async (accountId) => {
    try {
        const account = await prisma.users_accounts.update({
            where: { account_id: accountId },
            data: { likes: { increment: -1 } }
        });
        return account.likes;
    } catch (error) {
        throw new Error(`Failed to remove like: ${error}`);
    }
};

const addViewIfNotUserAccount = async (accountId, userId) => {
    try {
        // Récupérer le compte
        const account = await prisma.users_accounts.findUnique({
            where: { account_id: accountId },
        });

        // Vérifier si le userId n'est pas celui du accountId
        if (account && account.user_id !== userId) {
            // Ajouter un view
            const updatedAccount = await prisma.users_accounts.update({
                where: { account_id: accountId },
                data: { views: { increment: 1 } },
            });

            return updatedAccount.views;
        } else {
            return account.views;
        }
    } catch (error) {
        throw new Error(`Failed to add view: ${error}`);
    }
};


const addAccountsLikes = async (userId, accountId) => {
    try {
        await prisma.accounts_likes.create({
            data: {
                account_id: accountId,
                user_id: userId
            }
        });
        return true;
    } catch (error) {
        throw new Error(`Failed to add like: ${error}`);
    }
};

const removeAccountsLikes = async (userId, accountId) => {
    try {
        await prisma.accounts_likes.delete({
            where: {
                account_id_user_id: {
                    account_id: accountId,
                    user_id: userId
                }
            }
        });
        return true;
    } catch (error) {
        throw new Error(`Failed to remove like: ${error}`);
    }
};


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

const getCommunityAccounts = async (userId) => {
    const accounts = {
        certified: await getSharedCertifiedAccounts(userId),
        shared: await getSharedAccounts(userId)
    };
    return accounts;
}

const getSharedCertifiedAccounts = async (userId) => {
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

        // Récupère les identifiants des comptes que l'utilisateur a aimés
        const likedAccountIds = await prisma.accounts_likes.findMany({
            where: {
                user_id: userId,
            },
            select: {
                account_id: true,
            },
        });

        // Convertit le tableau des identifiants des comptes aimés en un Set
        const likedAccountIdsSet = new Set(
            likedAccountIds.map((like) => like.account_id)
        );

        const accounts = await prisma.users_accounts.findMany({
            where: {
                shared: true,
                certified: true
            },
        });

        const format = require('date-fns/format')

        const accountsWithDates = await Promise.all(accounts.map(async (account) => {
            const { entry_date, exit_date } = await getEntryAndExitDateByAccountId(account.account_id);
            const entry_date_formatted = entry_date ? format(entry_date, "MMM dd ''yy").toUpperCase() : null;
            const exit_date_formatted = exit_date ? format(exit_date, "MMM dd ''yy").toUpperCase() : null;

            return {
                ...account,
                entry_date: entry_date_formatted,
                exit_date: exit_date_formatted,
                isFavoritedByUser: favoritedAccountIdsSet.has(account.account_id),
                isLikedByUser: likedAccountIdsSet.has(account.account_id),
            };
        }));

        return accountsWithDates;
    } catch (error) {
        // Gérez l'erreur ici
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

        // Récupère les identifiants des comptes que l'utilisateur a aimés
        const likedAccountIds = await prisma.accounts_likes.findMany({
            where: {
                user_id: userId,
            },
            select: {
                account_id: true,
            },
        });

        // Convertit le tableau des identifiants des comptes aimés en un Set
        const likedAccountIdsSet = new Set(
            likedAccountIds.map((like) => like.account_id)
        );

        const accounts = await prisma.users_accounts.findMany({
            where: {
                shared: true,
                certified: false
            },
        });

        const format = require('date-fns/format')

        const accountsWithDates = await Promise.all(accounts.map(async (account) => {
            const { entry_date, exit_date } = await getEntryAndExitDateByAccountId(account.account_id);
            const entry_date_formatted = entry_date ? format(entry_date, "MMM dd ''yy").toUpperCase() : null;
            const exit_date_formatted = exit_date ? format(exit_date, "MMM dd ''yy").toUpperCase() : null;

            return {
                ...account,
                entry_date: entry_date_formatted,
                exit_date: exit_date_formatted,
                isFavoritedByUser: favoritedAccountIdsSet.has(account.account_id),
                isLikedByUser: likedAccountIdsSet.has(account.account_id),
            };
        }));

        return accountsWithDates;
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

const isOwnerOfAccount = async (accountId, userId) => {
    const account = await prisma.users_accounts.findUnique({
        where: { account_id: accountId },
    });
    return account.user_id === userId;
};


const addFavoriteAccount = async (accountId, userId) => {
    if (await isOwnerOfAccount(accountId, userId)) {
        // Si l'utilisateur est le propriétaire du compte, retourne null (ou tout autre valeur que vous jugerez appropriée)
        return null;
    }
    try {
        const updatedAccount = await prisma.users_accounts.update({
            where: { account_id: accountId },
            data: { favorite_count: { increment: 1 } }
        });
        return updatedAccount.favorite_count;
    } catch (error) {
        throw new Error(`Failed to add favorite: ${error}`);
    }
};


const removeFavoriteAccount = async (accountId, userId) => {
    try {
        if (await isOwnerOfAccount(accountId, userId)) {
            // Si l'utilisateur est le propriétaire du compte, retourne null (ou tout autre valeur que vous jugerez appropriée)
            return null;
        }
        const updatedAccount = await prisma.users_accounts.update({
            where: { account_id: accountId },
            data: { favorite_count: { decrement: 1 } }
        });
        return updatedAccount.favorite_count;
    } catch (error) {
        throw new Error(`Failed to remove favorite: ${error}`);
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
    getFavoriteAccountByUserId,
    addAccountsLikes,
    addLikeToUserAccount,
    removeAccountsLikes,
    removeLikeFromUserAccount,
    getEntryAndExitDateByAccountId,
    getCommunityAccounts,
    addViewIfNotUserAccount,
    addFavoriteAccount,
    removeFavoriteAccount,
    getAccountWithOrders,
    updateAccountStats
};
