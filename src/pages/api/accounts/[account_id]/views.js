
import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const account_id = parseInt(req.query.account_id, 10);
        const user_id = parseInt(req.body.user_id, 10);

        const views = await accountController.addViewIfNotUserAccount(account_id, user_id); 
        res.status(200).json(views); 
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
