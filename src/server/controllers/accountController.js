import { accountModel } from "../models/accountModel";
import { calculations } from "../utils/calculations";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const addFavoriteAccount = async(accountId, userId) => {
    await accountModel.addFavoriteAccount(accountId, userId);
    return;
}

const removeFavoriteAccount = async(accountId, userId) => {
    await accountModel.removeFavoriteAccount(accountId, userId);
    return;
};

const addViewIfNotUserAccount  = async(accountId, userId) => {
    const views = await accountModel.addViewIfNotUserAccount(accountId, userId);
    return views;
}

const getFavoriteAccountsByUserId = async(userId) => {
    const favoriteAccounts = accountModel.getFavoriteAccountByUserId(userId);
    return favoriteAccounts;
};

const getSharedAccounts = async(userId) => {
    const sharedAccount = await accountModel.getCommunityAccounts(userId);
    
    return sharedAccount;
}

const changeSharedAccountStatus = async(accountId) => {
    const accountShared = await accountModel.changeSharedAccountStatus(accountId);
    return accountShared;
};

const insertAccount = async (account) => {
    try {
        await accountModel.insertAccount(account);
        return {
            message: "The account has been added successfully."
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error occurred while adding the account."
        };
    }
};

const updateAccountBalanceByOrders = async (account, orders) => {
    account.current_balance = account.initial_balance;
    account.profit_and_loss = 0;
    account.profit_and_loss_percent = 0;
    account.orders_number = 0;
    account.losing_trades = 0;
    account.winning_trades = 0;
    for (const order of orders) {
        account.current_balance = Number(account.current_balance) + Number(order.profit);
        account.profit_and_loss = account.current_balance - account.initial_balance;
        account.profit_and_loss_percent = (account.profit_and_loss / account.initial_balance) * 100;
        account.orders_number += 1;
        account.losing_trades += calculations.isNegative(order.profit);
        account.winning_trades += calculations.isPositive(order.profit);
        const accountUpdated = await accountModel.updateAccount(account);
    };
    const accountUpdated = await accountModel.updateAccount(account);
};

const updateAccountBalanceFromOrder = async (account, order) => {
    // mettre à jour les données du compte
    account.current_balance = Number(account.current_balance) + Number(order.profit);
    account.profit_and_loss = account.current_balance - account.initial_balance;
    account.profit_and_loss_percent = (account.profit_and_loss / account.initial_balance) * 100;
    account.orders_number += 1;
    account.losing_trades += calculations.isNegative(order.profit);
    account.winning_trades += calculations.isPositive(order.profit);
    const accountUpdated = await accountModel.updateAccount(account);
};


const getAccountsFromUserId = async (user_id) => {
    try {
        const accounts = await accountModel.getAccountsFromUserId(user_id);
        return accounts;
    } catch (error) {
        console.error(error);
        return {
            message: "An error occurred while getting the accounts.",
        };
    }
};

const getAccountFromAccountId = async (account_id) => {
    try {
        const account = await accountModel.getAccountFromAccountId(account_id);
        return account;
    } catch (error) {
        console.error(error);
        return {
            message: "An error occurred while getting the account.",
        };
    }
};

const addAccountsLikes = async (userId, accountId) => {
    const isLike = await accountModel.addAccountsLikes(userId, accountId);
    if (isLike) {
        return accountModel.addLikeToUserAccount(accountId);
    };
    return isLike;
};

const removeAccountsLikes = async (userId, accountId) => {
    const isRemove = await accountModel.removeAccountsLikes(userId, accountId);
    if (isRemove) {
        return accountModel.removeLikeFromUserAccount(accountId);
    };
    return isRemove;
};

const addLikeToUserAccount = async(accountId) => {
    const like = await accountModel.addLikeToUserAccount(accountId);
    return like;
};

const removeLikeFromUserAccount = async(accountId) => {
    const like = await accountModel.removeLikeFromUserAccount(accountId);
    return like;
};


const getAccountWithOrders = async(accountId) => {
    const account = await accountModel.getAccountWithOrders(accountId);
    return account;
};

const updateAccountStats = async(accountId, orderId) => {
    return await accountModel.updateAccountStats(accountId, orderId);
};

export const accountController = {
    insertAccount,
    getAccountsFromUserId,
    getAccountFromAccountId,
    updateAccountBalanceFromOrder,
    updateAccountBalanceByOrders,
    changeSharedAccountStatus,
    getSharedAccounts,
    getFavoriteAccountsByUserId,
    addAccountsLikes,
    addLikeToUserAccount,
    removeLikeFromUserAccount,
    removeAccountsLikes,
    addViewIfNotUserAccount,
    addFavoriteAccount,
    removeFavoriteAccount,
    getAccountWithOrders,
    updateAccountStats
}
