import { createContext, useState } from "react"
export const AuthContext = createContext();


function AuthProvider(props) {
    const [account, setAccount] = useState();
    return (
        <AuthContext.Provider value={{account, setAccount}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
