import { orderController } from "@/server/controllers/orderController";
import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const account_id = parseInt(req.query.account_id, 10);
        const account = await accountController.getAccountFromAccountId(account_id);
        res.status(200).json(account);
        // Reste du code pour traiter la récupération des informations du compte
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
