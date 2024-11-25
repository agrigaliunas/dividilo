import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const storeIntoLocalStorage = (userData) => {
    localStorage.setItem("access-token", JSON.stringify(userData.token));
    localStorage.setItem("user", JSON.stringify(userData.user));
    setUser(userData);
  };

  const updateLocalStorage = (newUser) => {
    const currentToken = JSON.parse(localStorage.getItem("access-token"));
    const updatedUser = { ...newUser, token: currentToken };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    setUser(null);
  };

  const updateUserLocalStorage = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        name: userData.name,
        lastname: userData.lastname,
        initials: userData.initials,
        email: userData.email,
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, storeIntoLocalStorage, logout, updateLocalStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
