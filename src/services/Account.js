
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    setAccountShared
}

export default account;