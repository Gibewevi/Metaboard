import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    try {
        const sharedAccounts = await accountController.getSharedAccounts();
        res.status(200).json({ accounts: sharedAccounts });
    } catch (err) {
        res.status(500).json({ message: 'Erreur du serveur', error: err.toString() });
    }
}
