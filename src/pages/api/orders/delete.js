import { accountController } from "@/server/controllers/accountController";
import { orderController } from "@/server/controllers/orderController";
import { orderModel } from "@/server/models/orderModel";

export default async function handler(req, res) {
    try {
        let order = req.body;
        let accountId = parseInt(order.account_id);
        let orderId = parseInt(order.order_id);
        // supprime l'order de la base de donnée par son id
        await orderController.deleteOrderById(orderId);

        // actualise toutes les données de profits
        // récupère tous les ordres
        let orders = await orderController.getOrdersByAccountId(accountId);
        // récupère le compte
        let account = await accountController.getAccountFromAccountId(accountId);
        // trier et actualiser
        let orderHasUpdated = await orderController.updateOrdersAfterOrderDelete(orders, account);

        let ordersUpdated = await orderModel.setOrdersByOrders(orderHasUpdated);
        let accountUpdated = await accountController.updateAccountBalanceByOrders(account, ordersUpdated);
        res.status(200).json(ordersUpdated);
    } catch (error) {
        // Handle error
        res.status(500).json({ success: false, message: error.message });
    }
}

