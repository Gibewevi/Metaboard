import { orderController } from "@/server/controllers/orderController";

export default async function handler(req, res) {
    if (req.method === 'GET') {
    const account_id = parseInt(req.query.account_id, 10);
    console.log('account_id : ', account_id);
    const orders = await orderController.getOrdersByAccountId(account_id);
    const risksRewards = {
        RR : null,
        average : null,
        max : null
    };
    risksRewards.RR = orderController.getRisksRewardsByOrders(orders);
    risksRewards.average = orderController.getRiskRewardAverage(risksRewards.RR);
    risksRewards.max = orderController.getRiskRewardMaxValue(risksRewards.RR);
    res.status(200).json(risksRewards);
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
