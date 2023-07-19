
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserIdFromEmail = async (email) => {
    try {
        const user = await prisma.users_credentials.findUnique({
            where: {
                user_email: email,
            },
            select: {
                user_id: true,
            },
        });

        if (!user) {
            return {
                message: "User not found.",
            };
        }

        return user.user_id;
    } catch (error) {
        console.error(error);
        return {
            message: "An error occurred while getting the user ID.",
        };
    }
};



const verifyEmailIntoDataBase = async (email) => {
    try {
        const user = await prisma.users_credentials.findUnique({
            where: {
                user_email: email
            },
            select: {
                user_email: true
            }
        });
        return user !== null;  // si l'utilisateur existe, cela renvoie true, sinon false
    } catch (error) {
        console.error(error);
        return false; // Retourner false aussi en cas d'erreur
    }
};


const getHashPasswordByEmail = async (email) => {
    try {
        const user = await prisma.users_credentials.findUnique({
            where: {
                user_email: email,
            },
            select: {
                user_password: true,
            },
        });

        if (!user) {
            console.log("No user found with this email.");
            return null;
        }

        return user.user_password;
    } catch (error) {
        console.error(error);
    }
};


const insertUser = async (account) => {
    try {
        const newUser = await prisma.users_credentials.create({
            data: {
                user_email: account.email,
                user_password: account.password,
            },
        });
        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const userModel = {
    insertUser,
    verifyEmailIntoDataBase,
    getHashPasswordByEmail,
    getUserIdFromEmail
};
