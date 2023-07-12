import { orderController } from "@/server/controllers/orderController";
import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    };

    const account_id = parseInt(req.query.account_id, 10);
    try {
        // account
        const account = await accountController.getAccountFromAccountId(account_id);
        //orders
        const orders = await orderController.getOrdersByAccountId(account_id);
        // profitLoss
        const profitLoss = orderController.calculProfitAndLoss(orders);
        // risksRewards 
        const riskRewards = getRisksRewardByOrders(orders);

        const analytic = {
            orders : orders,
            profitLoss: profitLoss,
            account: account,
            risksRewards: riskRewards
        };
        
        res.status(200).json(analytic);
    } catch (err) {
        res.status(500).json({ message: 'Erreur du serveur', error: err.toString() });
    }
}

const getRisksRewardByOrders = (orders) => {
    const risksRewards = {
        RR: null,
        average: null,
        max: null
    };
    risksRewards.RR = orderController.getRisksRewardsByOrders(orders);
    risksRewards.average = parseFloat(orderController.getRiskRewardAverage(risksRewards.RR)).toFixed(2);
    risksRewards.max = parseFloat(orderController.getRiskRewardMaxValue(risksRewards.RR)).toFixed(2);
    return risksRewards;
};