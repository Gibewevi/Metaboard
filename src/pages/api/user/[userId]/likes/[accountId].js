import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    const userId = parseInt(req.query.userId);
    const accountId = parseInt(req.query.accountId);

    try {
        if (req.method === 'POST') {
            const likes = await accountController.addAccountsLikes(userId, accountId);
            res.status(200).json(likes);
        } else if (req.method === 'DELETE') {
            const likes = await accountController.removeAccountsLikes(userId, accountId);
            res.status(200).json(likes);
        } else {
            throw new Error('Method not allowed');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

