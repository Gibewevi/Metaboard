
const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "http://localhost:3000";

const signin = async (account, setAccount) => {

    if (account != undefined) {
        try {
            const response = await fetch(`${API_URL}/api/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            });

            const data = await response.json(); // Supposons que votre serveur renvoie un JSON avec le token
            const token = data.token; // Ou une autre clé si le token est stocké dans une clé différente
            if (token) {
                const user = {
                    email : data.email,
                    valid : true
                }
                return user;
            };
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}



const signup = async (account) => {
    if (account != undefined) {
        try {
            const response = await fetch(`${API_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            });

            if (!response.ok) {
                const data = await response.json(); // Read response body and parse it as JSON
                return data.message;
            } else {
                console.log('Signup succeeded');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Network or other error occurred during signup:', error);
        }
    }
};



const login = {
    signup,
    signin
}

export default login;