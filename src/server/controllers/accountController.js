import { accountModel } from "../models/accountModel";

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
    getAccountFromAccountId
}
