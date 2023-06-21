import { accountController } from "@/server/controllers/accountController";
import { orderController } from "@/server/controllers/orderController";

export default async function handler(req, res) {
    const order = req.body;
    const account_id = parseInt(order.account_id);
    // recupere le compte
    const account = await accountController.getAccountFromAccountId(account_id);
    const current_balance = account.current_balance;
    // convertir amount en risk
    const amount = await orderController.calculateRiskAmount(order, account);
    //     // calculer la taille de position
    const sizeOrder = orderController.calculatePositionSize(order, amount);
    const pl = orderController.calculateTradeProfitLoss(order, sizeOrder);
    const plPourcent = orderController.convertProfitLossToPercentage(pl, current_balance);
    order.type = orderController.calculateTradePosition(order);
    order.profit_pourcent = plPourcent;
    const response = await orderController.insertTradeByAccountId(order);
    // Ajouter le trade 
    // mettre à jour le compte (current_balance, PNL, PNL%, orders)
}




