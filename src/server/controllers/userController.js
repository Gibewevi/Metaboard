import { userModel } from "../models/userModel";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUserIdFromEmail = async (email) => {
    try {
        const user_id = await userModel.getUserIdFromEmail(email);
        return user_id;
    } catch (error) {
        console.error(error);
        return {
            message: "An error occurred while getting the user ID.",
        };
    }
};



const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const userIsExist = async (email) => {
    const emailExist = await userModel.verifyEmailIntoDataBase(email);
    if (emailExist) {
        return true;
    }
    return false;
}

const addFavoriteAccount = async(userId, accountId) => {
    const newFavoriteAccount = await userModel.addFavoriteAccount(userId, accountId);
    return newFavoriteAccount;
};

const deleteFavoriteAccount = async(userId, accountId) => {
    const deleteFavorite = await userModel.deleteFavoriteAccount(userId, accountId);
    return deleteFavorite;
};

const signin = async (userAccount) => {
    if (await userIsExist(userAccount.email)) {
      try {
        const user_id = await getUserIdFromEmail(userAccount.email);
        const passwordHash = await userModel.getHashPasswordByEmail(userAccount.email);
        const passwordMatch = await bcrypt.compare(userAccount.password, passwordHash.trim());
  
        if (passwordMatch) {
            console.log('isPasswordMatch');
            const payload = {
                user_id : user_id,
                email: userAccount.email,
              };
              console.log('payload : ',payload);
              const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15d' }); 
              console.log('token : ',token);
              return [true, token];
        } else {

        }
      } catch (error) {
        return [false, error.message];
      }
    }
    return [false, 'Utilisateur introuvable.'];
  };


const insertUser = async (account) => {
    try {
        const EmailExist = await userIsExist(account.email);
        if (EmailExist) {
            return { error: "Email already exists." }; // Retourner un objet avec une propriété `error`
        }
        const passwordHash = await hashPassword(account.password);
        account.password = passwordHash;
        await userModel.insertUser(account);
        return { message: "User created successfully" };
    } catch (error) {
        return { error };  // if there's an error, return it
    }
}

export const userController = {
    insertUser,
    signin,
    getUserIdFromEmail,
    addFavoriteAccount,
    deleteFavoriteAccount
}
