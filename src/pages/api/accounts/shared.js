import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    try {
        const userId = parseInt(req.query.userId);
        const sharedAccounts = await accountController.getSharedAccounts(userId);
        console.log(sharedAccounts);
        res.status(200).json({ accounts: sharedAccounts });
    } catch (err) {
        res.status(500).json({ message: 'Erreur du serveur', error: err.toString() });
    }
}
