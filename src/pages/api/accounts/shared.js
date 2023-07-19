import { accountController } from "@/server/controllers/accountController";
import { orderController } from "@/server/controllers/orderController";
import { userController } from "@/server/controllers/userController";

export default async function handler(req, res) {
    try {
        const userId = parseInt(req.query.userId);

         // récupère les 10 derniers trades
        const sharedAccounts = await accountController.getSharedAccounts(userId);

        // vérifie si l'utilisateur à mis en favoris le compte

        res.status(200).json({ accounts: sharedAccounts });
    } catch (err) {
        res.status(500).json({ message: 'Erreur du serveur', error: err.toString() });
    }
}
