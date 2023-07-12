import { accountController } from "@/server/controllers/accountController";
import { orderController } from "@/server/controllers/orderController";

export default async function handler(req, res) {
    try {
         // récupère les 10 derniers trades
        const sharedAccounts = await accountController.getSharedAccountsWithOrders();
        // calcul le profitLoss pour le rajouter dans chaque account
        
        sharedAccounts.forEach(account => {
            const profitLoss = orderController.calculProfitAndLoss(account.orders);
            account.profitLoss = profitLoss;
            return account;
        });
        res.status(200).json({ accounts: sharedAccounts });
    } catch (err) {
        res.status(500).json({ message: 'Erreur du serveur', error: err.toString() });
    }
}
