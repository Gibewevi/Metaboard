import { accountController } from "@/server/controllers/accountController";
import { orderController } from "@/server/controllers/orderController";

export default async function handler(req, res) {
    try {
        let order = req.body;
        const account_id = parseInt(order.account_id);
        const account = await getAccount(account_id);
        const amount = await calculateRiskAmount(order, account);
        order = await updateOrderDetails(order, account, amount);
        await insertTrade(order);
        await accountController.updateAccountBalanceFromOrder(account, order);
        // Ajoutez cette ligne pour envoyer une réponse de succès
        res.status(200).json(order);
    } catch (error) {
        // Handle error
        res.status(500).json({ success: false, message: error.message });
    }
}


async function getAccount(account_id) {
    const account = await accountController.getAccountFromAccountId(account_id);
    return account;
}

async function calculateRiskAmount(order, account) {
    const amount = await orderController.calculateRiskAmount(order, account);
    return amount;
}

async function updateOrderDetails(order, account, riskAmount) {
    const orderSize = orderController.calculateOrderSize(order, riskAmount);
    const profitLoss = orderController.calculateTradeProfitLoss(order, orderSize);
    const profitLossPercentage = orderController.convertProfitLossToPercentage(profitLoss, account.current_balance);
    order.amount = riskAmount;
    order.type = orderController.calculateTradePosition(order);
    order.profit = profitLoss;
    order.profit_percent = profitLossPercentage;
    return order;
}

async function insertTrade(order) {
    await orderController.insertTradeByAccountId(order);
}



