import { userController } from "@/server/controllers/userController";

export default async function handler(req, res) {
    // Récupération des valeurs userId et accountId depuis la requête
    const userId = req.query.userId;
    const accountId = req.query.accountId;

    // Conversion des valeurs en entiers
    const user_id = parseInt(userId);
    const account_id = parseInt(accountId);

    // Appel à la méthode du contrôleur pour ajouter un compte favori
    const newFavoriteAccount = await userController.addFavoriteAccount(user_id, account_id);

    // Affichage du nouveau compte favori
    console.log('favorite account : ', newFavoriteAccount);
};
