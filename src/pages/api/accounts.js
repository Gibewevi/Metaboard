import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const user_id = parseInt(req.query.user_id, 10);
        const accounts = await accountController.getAccountsFromUserId(user_id);
        res.status(200).json({ accounts });
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}




