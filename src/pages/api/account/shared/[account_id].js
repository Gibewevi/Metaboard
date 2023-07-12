import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    let accountId = parseInt(req.body.accountId, 10);
    try {
        const accountShared = await accountController.changeSharedAccountStatus(accountId);
        res.status(200).json(accountShared);
    } catch (err) {
        res.status(500).json({ message: 'Erreur du serveur', error: err.toString() });
    }
}
