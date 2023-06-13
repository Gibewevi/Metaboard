const API_URL = "http://localhost:3000";

const signin = async (account) => {
    console.log('login : ', account);
    if (account != undefined) {
        try {
            const response = await fetch(`${API_URL}/api/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            });
        } catch {

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
                console.log('Signup failed:', data.message);
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