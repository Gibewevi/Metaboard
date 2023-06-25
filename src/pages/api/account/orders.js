import { orderController } from "@/server/controllers/orderController";

export default async function handle(req, res) {
    try {
        const account_id = parseInt(req.query.account_id);
        const orders = await orderController.getOrdersByAccountId(account_id);
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
    }
}
