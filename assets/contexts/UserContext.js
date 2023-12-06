import React, { createContext, useState, useContext, useCallback } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserAndGardenDetails = useCallback(async (uid) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const gardenRef = doc(db, 'gardens', userData.gardenId);
      const gardenSnap = await getDoc(gardenRef);

      if (gardenSnap.exists()) {
        // Update the user state with garden details
        setUser({
          ...userData,
          garden: gardenSnap.data(),
        });
      } else {
        // Handle case where garden details are not found
        console.error('Garden details not found');
      }
    } else {
      // Handle case where user details are not found
      console.error('User details not found');
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserAndGardenDetails }}>
      {children}
    </UserContext.Provider>
  );
};
