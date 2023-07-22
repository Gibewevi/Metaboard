import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    // Récupération des valeurs userId et accountId depuis la requête
    const userId = req.query.userId;
    const accountId = req.query.accountId;

    // Conversion des valeurs en entiers
    const user_id = parseInt(userId);
    const account_id = parseInt(accountId);

    if (req.method === 'POST') {
        // ajouter un like dans la table account_like
        const likes = await accountController.addAccountsLikes(user_id, account_id);
        res.status(200).json(likes);
    } 
    else if (req.method === 'DELETE') {
        console.log('DELETE');
        // supprimer le like dans la table account_like
        const likes = await accountController.removeAccountsLikes(user_id, account_id);
        console.log('likes : ', likes);
        res.status(200).json(likes);
    }
};
