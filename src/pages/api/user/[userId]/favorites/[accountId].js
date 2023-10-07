import { userController } from "@/server/controllers/userController";
import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    // Récupération des valeurs userId et accountId depuis la requête
    const userId = req.query.userId;
    const accountId = req.query.accountId;

    // Conversion des valeurs en entiers
    const user_id = parseInt(userId);
    const account_id = parseInt(accountId);

    // Vérification de la méthode HTTP
    if (req.method === 'DELETE') {

        // Appel à la méthode du contrôleur pour supprimer un compte favori
        const isDelete = await userController.deleteFavoriteAccount(user_id, account_id);

        // enlever +1 favorite au compte
        await accountController.removeFavoriteAccount(account_id, user_id);
        // Envoi de la réponse au client
        res.status(200).json(isDelete);
    } else {
        // Appel à la méthode du contrôleur pour ajouter un compte favori
        const isFavorite = await userController.addFavoriteAccount(user_id, account_id);

        // ajouter +1 favorite au compte
        await accountController.addFavoriteAccount(account_id, user_id);
        // Envoi de la réponse au client
        res.status(200).json(isFavorite);
    }
};
