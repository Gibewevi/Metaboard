import { accountController } from "@/server/controllers/accountController";
import { orderController } from "@/server/controllers/orderController";
import { calculations } from "@/server/utils/calculations";

export default async function handler(req, res) {
    try {
        let order = req.body;
        const account_id = parseInt(order.account_id);
        console.log('account_id : ', account_id);
        const account = await getAccount(account_id);
        console.log('account : ', account);
        const risk = await calculateRiskAmount(order, account);
        console.log('risk : ', risk);
        order.risk_reward = orderController.calculRiskRewardByOrder(order);
        console.log('order.risk_reward ', order.risk_reward);
        order = await updateOrderDetails(order, account, risk);
        console.log('order : ', order);
        const newOrder = await insertTrade(order);
        console.log('newOrder : ', newOrder);
        await accountController.updateAccountBalanceFromOrder(account, order);
        // Ajoutez cette ligne pour envoyer une réponse de succès
        res.status(200).json(newOrder);
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
    const risk = await calculations.calculateRiskAmount(order, account);
    return risk;
}

async function updateOrderDetails(order, account, risk) {
    const orderSize = calculations.calculateOrderSize(order, risk);
    const profitLoss = calculations.calculateTradeProfitLoss(order, orderSize);
    const profitLossPercentage = calculations.convertProfitLossToPercentage(profitLoss, account.current_balance);
    order.risk = risk;
    order.type = orderController.calculateTradePosition(order);
    order.profit = profitLoss;
    order.profit_percent = profitLossPercentage;
    return order;
}

async function insertTrade(order) {
    const newOrder = await orderController.insertTradeByAccountId(order);
    return newOrder;
}



