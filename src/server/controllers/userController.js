import { userModel } from "../models/userModel";
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const insertUser = async (account) => {
    try {
        const emailExisted = await userModel.verifyEmailIntoDataBase(account.email);
        if (emailExisted) {
            return; // Terminer l'exécution si l'email existe déjà
        }

        const passwordHash = await hashPassword(account.password);
        account.password = passwordHash;

        await userModel.insertUser(account);
    } catch (error) {
        console.error('Une erreur est survenue lors de la création de l\'utilisateur :', error);
    }
}

export const userController = {
    insertUser
}
