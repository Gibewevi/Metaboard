import { orderController } from "@/server/controllers/orderController";
import { accountController } from "@/server/controllers/accountController";


export default async function handler(req, res) {
    if (req.method === 'GET') {
    const account_id = parseInt(req.query.account_id, 10);
    const account = await accountController.getAccountFromAccountId(account_id);
    const orders = await orderController.getOrdersByAccountId(account_id);
    const profitLoss = orderController.calculProfitAndLoss(orders);
    res.status(200).json({profitLoss : profitLoss, account : account});
        // Reste du code pour traiter la récupération des informations du compte
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}



    // current_balance
    // current_PL
    // current_winrate
    // total orders
    // const account = accountController.getAccountFromAccountId(account_id);
    // const orders = orderController.getOrdersByAccountId(account_id);
    // const profitLoss = orderController.calculProfitAndLoss(orders);
    // console.log(profitLoss);
    // récupère les ordres
    // construire une table avec 
