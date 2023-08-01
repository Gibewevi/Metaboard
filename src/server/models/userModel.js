import account from '@/services/Account';

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const isUserAccount = async (userId, accountId) => {
    const account = await prisma.users_accounts.findUnique({
        where: { account_id: accountId }
    });

    return Boolean(account && account.user_id === userId);
};

const deleteFavoriteAccount = async (userId, accountId) => {
    try {
        const deletedFavoriteAccount = await prisma.favorites_accounts.delete({
            where: { account_id_user_id: { account_id: accountId, user_id: userId } }
        });
        console.log("Le compte a été retiré des favoris.");
        return false;
    } catch (error) {
        console.error("Une erreur est survenue lors de la suppression du compte des favoris : ", error);
        throw error;
    }
};


const addFavoriteAccount = async (userId, accountId) => {
    try {
        if (await isUserAccount(userId, accountId)) {
            console.log("L'utilisateur ne peut pas ajouter ses propres comptes à ses favoris.");
            return false;
        }

        const newFavoriteAccount = await prisma.favorites_accounts.create({
            data: { account_id: accountId, user_id: userId }
        });

        return true;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            console.log("Favorite account already exists");
        } else {
            console.error(error);
            throw error;
        }
    }
};


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
        const newUser = await prisma.$transaction([
            prisma.users_credentials.create({
                data: {
                    user_email: account.email,
                    user_password: account.password,
                },
            }),
            prisma.users_profile.create({
                data: {
                    user_id: account.id,
                },
            }),
        ]);
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
    getUserIdFromEmail,
    addFavoriteAccount,
    deleteFavoriteAccount
};
