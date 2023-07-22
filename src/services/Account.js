
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const likeAccount = async (userId, accountId) => {
    try {
        const res = await fetch(`/api/user/${userId}/likes/${accountId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const likes = await res.json();
        return likes;
    } catch (error) {

    };
};

const unlikeAccount = async (userId, accountId) => {
    try {
        const res = await fetch(`/api/user/${userId}/likes/${accountId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const likes = await res.json();
        return likes;
    } catch (error) {

    };
};

const getUserFavoriteAccounts = async () => {
    try {
        const res = await fetch(`/api/user/${userId}/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {

    };
};

const deleteFavoriteAccount = async (userId, accountId) => {
    try {
        const res = await fetch(`/api/user/${userId}/favorites/${accountId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const isDelete = await res.json();
        return isDelete;
    } catch (error) {

    };
};

const addFavoriteAccountByAccountId = async (userId, accountId) => {
    try {
        const res = await fetch(`/api/user/${userId}/favorites/${accountId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const isFavorite = await res.json();
        return isFavorite;
    } catch (error) {

    };
};

const setAccountShared = async (accountId) => {
    try {
        const res = await fetch(`/api/account/shared/${accountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accountId: accountId })
        });
        const shared = await res.json();
        return shared;
    } catch (error) {
        console.log(error);
    }
}

const account = {
    setAccountShared,
    addFavoriteAccountByAccountId,
    getUserFavoriteAccounts,
    deleteFavoriteAccount,
    likeAccount,
    unlikeAccount
}

export default account;