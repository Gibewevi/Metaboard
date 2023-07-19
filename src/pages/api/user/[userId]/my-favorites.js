import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    const userId = parseInt(req.query.userId);
    //récupérer tous les comptes favoris
    const favoriteAccounts = await accountController.getFavoriteAccountsByUserId(userId);
    // Renvoyer les comptes favoris en tant que réponse JSON
    res.status(200).json(favoriteAccounts);
}


