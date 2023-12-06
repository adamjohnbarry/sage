import React, { createContext, useState, useContext } from 'react';
const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ gardenName: '', gardenAddress: '', gardenDays: '', gardenTimes: '' });
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};