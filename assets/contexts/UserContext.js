import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [garden, setGarden] = useState(null);
  const [gardenDaysTimes, setGardenDaysTimes] = useState({});

  const fetchUserAndGardenDetails = useCallback(async (uid) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      setUser((currentUser) => ({
        ...currentUser,
        ...userData,
      }));

      const gardenRef = doc(db, 'gardens', userData.gardenId);
      const gardenSnap = await getDoc(gardenRef);
      if (gardenSnap.exists()) {
        setGarden((currentGarden) => ({
          ...currentGarden,
          ...gardenSnap.data(),
        }));
      } else {
        console.error('Garden details not found');
      }
    } else {
      console.error('User details not found');
    }
  }, []);

  const updateUserDetails = useCallback(async (newUserData) => {
    if (!user) {
      console.error('No user to update.');
      return;
    }

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);

    try {
      await updateDoc(userRef, newUserData);
      setUser((currentUser) => ({
        ...currentUser,
        ...newUserData,
      }));
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  }, [user]);

  const updateGardenDetails = useCallback(async (newGardenData) => {
    if (!user || !user.gardenId) {
      console.error('No garden to update.');
      return;
    }

    const db = getFirestore();
    const gardenRef = doc(db, 'gardens', user.gardenId);

    try {
      await updateDoc(gardenRef, newGardenData);
      setGarden((currentGarden) => ({
        ...currentGarden,
        ...newGardenData,
      }));
    } catch (error) {
      console.error('Error updating garden details:', error);
    }
  }, [user]);

  useEffect(() => {
    console.log('UserContext user state updated: ', user);
  }, [user]);

  useEffect(() => {
    console.log('UserContext garden days times state updated: ', gardenDaysTimes);
  }, [gardenDaysTimes]);

  useEffect(() => {
    console.log('UserContext garden: ', garden);
  }, [garden]);


  return (
    <UserContext.Provider value={{
      user,
      garden,
      setUser,
      setGarden,
      fetchUserAndGardenDetails,
      updateUserDetails,
      updateGardenDetails,
      gardenDaysTimes,
      setGardenDaysTimes
    }}>
      {children}
    </UserContext.Provider>
  );
};
