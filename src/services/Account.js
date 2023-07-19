
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const addFavoriteAccountByAccountId = async (userId, accountId) => {
    console.log('user : ', userId);
    console.log('accountId : ', accountId);
    try {
        const res = await fetch(`/api/user/${userId}/favorites/${accountId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    } catch(error){

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
    addFavoriteAccountByAccountId
}

export default account;