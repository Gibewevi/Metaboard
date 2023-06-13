import { userModel } from "../models/userModel";
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const userIsExist = async (email) => {
    const emailExist = await userModel.verifyEmailIntoDataBase(account.email);
    if (emailExist) {
        return true;
    }
    return false;
}

const signin = async (account) => {
    if (userIsExist(account.email)) {
        //  récuperer le password hash
        // vérifier les deux password
        // renvoyer l'utilisateur sur le dashboard avec un token

        // retourner une erreur d'authentification
    }

    // sinon retourner une erreur "user don't exist"
}

const insertUser = async (account) => {
    try {
        if (userIsExist(account.email)) {
            return { error: "Email already exists." }; // Retourner un objet avec une propriété `error`
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
