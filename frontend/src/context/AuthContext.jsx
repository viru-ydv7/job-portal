import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        // 🚨 CRITICAL FIX
        if (!storedUser || storedUser === "undefined") {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken || null;
    });

    const login = (userData, jwtToken) => {

    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
};


    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
