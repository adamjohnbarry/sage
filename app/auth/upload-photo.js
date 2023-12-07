import { Text, View } from 'react-native';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import FormButton from '../../assets/components/FormButton';
import * as ImagePicker from 'expo-image-picker';
import FormPhoto from '../../assets/components/FormPhoto';
import { getAuth } from 'firebase/auth';

import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const UploadPhoto = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [photo, setPhoto] = useState(
		'https://media.licdn.com/dms/image/D4E03AQGVq7H6Aowx6g/profile-displayphoto-shrink_800_800/0/1701141939944?e=1706745600&v=beta&t=RW_G2QxAaxB4bUckWs00TUPe9fGCSbdcngVtnoZejEM'
	);

	// handle choosing a photo to upload from your library
	const choosePhotoFromLibrary = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		// if we don't cancel the selection, then update the photo state
		if (!result.canceled) {
			handleImageUpload(result.assets[0].uri);
		}
	};

	// handle uploading the image to firestore
	const handleImageUpload = async (uri) => {
		const auth = getAuth();
		const storage = getStorage();

		const response = await fetch(uri);
		const blob = await response.blob();

		const storageRef = ref(storage, `images/${auth.currentUser.uid}`);

		// upload image to firestore
		uploadBytes(storageRef, blob)
			.then((image) => {
				// retrieve the photo from firebase and update it
				getDownloadURL(storageRef)
					.then((url) => {
						setPhoto(url);
					})
					.catch((err) => {
						console.log(lang.errors.photoRetrievalError);
					});
			})
			.catch((err) => {
				console.log(lang.errors.photoUploadError);
			});
	};

	// update account with photo url
	const updatePhotoURL = async (e) => {
		e.preventDefault();

		if (!photo) {
			console.log(lang.error.photoUploadError);
		} else {
			const auth = getAuth();
			const db = getFirestore();

			const userRef = doc(db, 'users', auth.currentUser.uid);

			// update the user's photo
			try {
				await updateDoc(userRef, {
					photo,
				});

				router.push({
					pathname: '/auth/join-group',
					params: { index: 2, title: lang.auth.joinGroup.title, description: lang.auth.joinGroup.description },
				});
			} catch (err) {
				console.log(`${err.code}: ${err.message}`);
			}
		}
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.photo.label}</Text>
						<FormPhoto source={photo} />
					</View>
					<View style={globalStyles.formGroup}>
						<FormButton icon='photo-video' label={lang.form.chooseFromLibrary.label} onPress={choosePhotoFromLibrary} />
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button
						text={lang.button.skip}
						color='white'
						onPress={() =>
							router.push({
								pathname: '/auth/join-group',
								params: { index: 2, title: lang.auth.joinGroup.title, description: lang.auth.joinGroup.description },
							})
						}
					/>
					<Button text={lang.button.finish} onPress={updatePhotoURL} />
				</View>
			</View>
		</View>
	);
};

export default UploadPhoto;
