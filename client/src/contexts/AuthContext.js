import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || null);

  const storeIntoLocalStorage = (userData) => {
    const userWithToken = {
      ...userData.user,
      token: userData.token,
    };
    localStorage.setItem("user", JSON.stringify(userWithToken));
    setUser(userWithToken);
  };

  const updateLocalStorage = (newUser) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const updatedUser = {
      ...currentUser,
      ...newUser,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, storeIntoLocalStorage, logout, updateLocalStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
