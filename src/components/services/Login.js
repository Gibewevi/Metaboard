const API_URL = "http://localhost:3000";

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

            if (response.ok) {
                // Handle successful signup
                console.log('Signup successful');
            } else {
                // Handle signup error
                console.log('Signup failed');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error occurred during signup:', error);
        }
    }
};

const login = {
    signup
}

export default login;