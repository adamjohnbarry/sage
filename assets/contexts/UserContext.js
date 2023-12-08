import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';

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

	const createUserAccount = useCallback(async (email, password) => {
		console.log('ep: ', email, password);
		if (!email || !password) {
			console.error('Email or password is missing.');
			return false;
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const newUser = userCredential.user;

			// Set initial user data in Firestore
			const db = getFirestore();
			await setDoc(doc(db, 'users', newUser.uid), {
				email,
				password, // Be cautious about storing plain passwords in Firestore
				// other initial user data
			});

			setUser((currentUser) => ({
				...currentUser,
				uid: newUser.uid,
				email,
				password,
			}));

			return true;
		} catch (error) {
			console.error('Error creating user account:', error);
			return false;
		}
	}, []);

	const joinGarden = useCallback(
		async (inviteWord) => {
			if (!inviteWord) {
				console.log('Invite word is missing.');
				return false;
			}

			const db = getFirestore();
			const gardenRef = collection(db, 'gardens');
			const containsGarden = query(gardenRef, where('inviteWord', '==', inviteWord.toLowerCase()));
			const gardens = await getDocs(containsGarden);

			let garden;
			gardens.forEach((gardenObj) => {
				garden = { ...gardenObj.data(), id: gardenObj.id };
			});

			if (!garden) {
				console.log('Garden not found.');
				return false;
			}

			// Update user's gardenId and garden data
			const userRef = doc(db, 'users', user.uid);
			await updateDoc(userRef, { gardenId: garden.id });
			setGarden(garden);

			return true;
		},
		[user, setGarden]
	);

	const submitRegistration = useCallback(async () => {
		if (!user || !garden) {
			console.error('User or Garden data is incomplete.');
			return false;
		}

		const db = getFirestore();
		try {
			// Update user in the database
			const userRef = doc(db, 'users', user.uid);
			await updateDoc(userRef, user);

			// Add garden to the database
			const gardenRef = await addDoc(collection(db, 'gardens'), garden);

			// Update user's gardenId
			await updateDoc(userRef, { gardenId: gardenRef.id });

			return true;
		} catch (error) {
			console.error('Error submitting registration:', error);
			return false;
		}
	}, [user, garden]);

	const updateUserPhoto = useCallback(
		async (photoUrl) => {
			if (!user) {
				console.error('No user to update.');
				return;
			}

			const updatedUserData = { ...user, photo: photoUrl };
			setUser(updatedUserData);

			const db = getFirestore();
			const userRef = doc(db, 'users', user.uid);

			try {
				await updateDoc(userRef, { photo: photoUrl });
			} catch (error) {
				console.error('Error updating user photo:', error);
			}
		},
		[user]
	);

	const updateUserDetails = useCallback(
		async (newUserData) => {
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
		},
		[user]
	);

	const updateGardenDetails = useCallback(
		async (newGardenData) => {
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
		},
		[user]
	);

	const checkInviteWordAvailability = async (word) => {
		const db = getFirestore();
		const gardenRef = collection(db, 'gardens');
		const querySnapshot = await getDocs(query(gardenRef, where('inviteWord', '==', word.toLowerCase())));

		return querySnapshot.empty; // Returns true if no documents are found, false otherwise
	};

	useEffect(() => {
		console.log('USER UPDATED: ', user);
	}, [user]);

	useEffect(() => {
		console.log('DAYSTIMES UPDATED: ', gardenDaysTimes);
	}, [gardenDaysTimes]);

	useEffect(() => {
		console.log('GARDEN UPDATED: ', garden);
	}, [garden]);

	return (
		<UserContext.Provider
			value={{
				user,
				garden,
				setUser,
				setGarden,
				fetchUserAndGardenDetails,
				updateUserDetails,
				updateGardenDetails,
				submitRegistration,
				gardenDaysTimes,
				setGardenDaysTimes,
				createUserAccount,
				joinGarden,
				updateUserPhoto,
				checkInviteWordAvailability,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
