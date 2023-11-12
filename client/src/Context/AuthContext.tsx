import {FC, createContext, useContext, useState} from 'react';

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
}

type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC = ({children}) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null
    const [user,
        setUser] = useState<User | null>(storedUser);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData))
    };

    const logout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context
}
