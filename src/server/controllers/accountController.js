import { accountModel } from "../models/accountModel";
import { orderModel } from "../models/orderModel";


const getSharedAccounts = async(userId) => {
    const sharedAccount = await accountModel.getSharedAccounts(userId);
    sharedAccount.forEach(account => {
        console.log(account)
    });
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
        account.losing_trades += isNegative(order.profit);
        account.winning_trades += isPositive(order.profit);
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
    account.losing_trades += isNegative(order.profit);
    account.winning_trades += isPositive(order.profit);
    const accountUpdated = await accountModel.updateAccount(account);
};

const isPositive = (number) => {
    if (number > 0) {
        return 1;
    };
    return 0;
};

const isNegative = (number) => {
    if (number < 0) {
        return 1;
    };
    return 0;
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

export const accountController = {
    insertAccount,
    getAccountsFromUserId,
    getAccountFromAccountId,
    updateAccountBalanceFromOrder,
    updateAccountBalanceByOrders,
    changeSharedAccountStatus,
    getSharedAccounts
}
