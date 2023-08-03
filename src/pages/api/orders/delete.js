import { orderController } from "@/server/controllers/orderController";
import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    try {
        let order = req.body;
        let accountId = parseInt(order.account_id);
        let orderId = parseInt(order.order_id);

        const accountUpdated = await accountController.updateAccountStats(accountId, orderId);

        res.status(200).json(accountUpdated.orders);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
