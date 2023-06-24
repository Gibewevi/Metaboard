import { accountController } from "@/server/controllers/accountController";
import { orderController } from "@/server/controllers/orderController";

export default async function handler(req, res) {
    try {
        let orders = req.body;
        const ratio = orderController.calculRatioLongShort(orders);
        console.log(ratio);
        res.status(200).json(ratio);
    } catch (error) {
        // Handle error
        res.status(400).json({message : 'erreur'});
    }
}