import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user data here

    const login = async (userData) => {
        const response = await axiosInstance.post('/auth/login', userData);
        if (response.data.success) {
            setUser(response.data.userData); // Store user data on login
            sessionStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
        }
    };

    const logout = () => {
        setUser(null); // Clear user data on logout
        sessionStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const getUserFromCookie = () => {
    const cookie = document.cookie;
    const userData = cookie.split('; ').find(row => row.startsWith('userData=')).split('=')[1];
    return userData ? JSON.parse(userData) : null;
};

export const getUserFromSessionStorage = () => {
    const userData = sessionStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};


