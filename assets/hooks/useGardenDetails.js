import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useState } from 'react';

const useGardenDetails = () => {
	const [gardenDetails, setGardenDetails] = useState(null);
	const [error, setError] = useState(null);

	const fetchGardenDetails = async () => {
		try {
			const auth = getAuth();
			const db = getFirestore();
			const userRef = doc(db, 'users', auth.currentUser.uid);
			const userSnap = await getDoc(userRef);

			if (!userSnap.exists()) {
				throw new Error('User not found');
			}

			const gardenRef = doc(db, 'gardens', userSnap.data().gardenId);
			const gardenSnap = await getDoc(gardenRef);

			if (gardenSnap.exists()) {
				console.log('Garden found');
				console.log(gardenSnap.data());
				setGardenDetails(gardenSnap.data());
			} else {
				throw new Error('Garden not found');
			}
		} catch (err) {
			setError(err);
		}
	};

	return { gardenDetails, fetchGardenDetails, error };
};

export default useGardenDetails;
