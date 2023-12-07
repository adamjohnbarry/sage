import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [gardenDaysTimes, setGardenDaysTimes] = useState({});

  const fetchUserAndGardenDetails = useCallback(async (uid) => {
    console.log('Fetching user and garden details...')
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const gardenRef = doc(db, 'gardens', userData.gardenId);
      const gardenSnap = await getDoc(gardenRef);
      console.log('new user: ', {
        ...userData,
        garden: gardenSnap.data(),
      });
      console.log('garden days and times: ', gardenDaysTimes)
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

  useEffect(() => {
    console.log('UserContext user state updated: ', user);
  }, [user]);

  useEffect(() => {
    console.log('UserContext garden days times state updated: ', gardenDaysTimes);
  }, [user]);

  const updateUserGardenDetails = useCallback(async (gardenData) => {
    const db = getFirestore();
    const gardenRef = doc(db, 'gardens', user.gardenId);

    try {
      await updateDoc(gardenRef, gardenData);
      setUser((currentUser) => {
        if (!currentUser || !currentUser.garden) {
          console.error('Current user or garden is undefined.');
          return currentUser; // or handle this case appropriately
        }
        return {
          ...currentUser,
          garden: {
            ...currentUser.garden,
            ...gardenData,
          },
        }
      });
    } catch (error) {
      console.error('Error updating garden details:', error);
    }
  }, [user]);

  const combinedUser = user ? { ...user, garden: { ...user.garden, ...gardenDaysTimes } } : null;

  return (
    <UserContext.Provider value={{ user: combinedUser, setUser, fetchUserAndGardenDetails, updateUserGardenDetails, gardenDaysTimes, setGardenDaysTimes }}>
      {children}
    </UserContext.Provider>
  );
};
