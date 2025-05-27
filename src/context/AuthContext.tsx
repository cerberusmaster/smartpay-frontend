import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';
import type { User } from '../types/user';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    setToken: (token: string) => Promise<void>;
    reload: () => void,
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    const loadUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            const res = await axios.get<User>('/auth/me');
            console.log(token, res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (e) {
            console.log(e);
            logout();
        }
    };

    const setToken = async (token: string) => {
        localStorage.setItem('token', token);
        await loadUser();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setToken, logout, reload: loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easy access
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
