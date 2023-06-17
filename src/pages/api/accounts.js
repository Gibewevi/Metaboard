import { accountController } from "@/server/controllers/accountController";
import { userController } from "@/server/controllers/userController";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query;
        const user_id = await userController.getUserIdFromEmail(email);
        const accounts = await accountController.getAccountsFromUserId(user_id);
        console.log('accounts : ', accounts);
        res.status(200).json({ accounts });
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
