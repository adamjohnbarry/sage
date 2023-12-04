import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD6sMd3OPptQuWSjxEfSgKnWPB3XiT7PVY',
	authDomain: 'sage-cff75.firebaseapp.com',
	projectId: 'sage-cff75',
	storageBucket: 'sage-cff75.appspot.com',
	messagingSenderId: '1004408814107',
	appId: '1:1004408814107:web:4b70e85a0cf42430df16be',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialise database
export const db = getFirestore(app);

export default app;
