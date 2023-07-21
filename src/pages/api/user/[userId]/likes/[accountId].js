import { accountController } from "@/server/controllers/accountController";

export default async function handler(req, res) {
    // Récupération des valeurs userId et accountId depuis la requête
    const userId = req.query.userId;
    const accountId = req.query.accountId;

    // Conversion des valeurs en entiers
    const user_id = parseInt(userId);
    const account_id = parseInt(accountId);

    //POST
    const like = await accountController.addLike(user_id, account_id);
    
    // ajouter un like dans la table account_like
    // incrementer le like dans la table user_account

    //PUT
    // supprimer le like dans la table account_like
    // decrementer le like dans la table user_account

    res.status(200).json({mess:'like is valide'});
};
