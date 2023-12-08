import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import FormButton from '../../assets/components/FormButton';
import FormPhoto from '../../assets/components/FormPhoto';
import { useUser } from '../../assets/contexts/UserContext';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import ButtonGroup from '../../assets/components/ButtonGroup';
import Form from '../../assets/components/Form';
import FormContainer from '../../assets/components/FormContainer';
import FormGroup from '../../assets/components/FormGroup';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';

const UploadPhoto = () => {
	const router = useRouter();
	const { updateUserPhoto } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [photo, setPhoto] = useState(
		'https://media.licdn.com/dms/image/D4E03AQGVq7H6Aowx6g/profile-displayphoto-shrink_800_800/0/1701141939944?e=1706745600&v=beta&t=RW_G2QxAaxB4bUckWs00TUPe9fGCSbdcngVtnoZejEM'
	);
	const [photoUploaded, setPhotoUploaded] = useState(false);

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

		try {
			const response = await fetch(uri);
			const blob = await response.blob();

			const storageRef = ref(storage, `images/${auth.currentUser.uid}-${new Date().getTime()}`);

			uploadedPhoto = await uploadBytesResumable(storageRef, blob);

			const downloadedPhoto = await getDownloadURL(storageRef);

			if (downloadedPhoto) {
				setPhoto(downloadedPhoto);
				setPhotoUploaded(true);
				updateUserPhoto(downloadedPhoto); // update photo in user context and database
			}
		} catch (err) {
			console.log(lang.error.photoUploadError);
		}
	};

	return (
		<FormContainer safeArea={safeArea}>
			<Form>
				<FormGroup label={lang.form.photo.label}>
					<FormPhoto source={photo} />
				</FormGroup>
				<FormGroup>
					<FormButton icon='photo-video' label={lang.form.chooseFromLibrary.label} onPress={choosePhotoFromLibrary} />
				</FormGroup>
			</Form>
			<ButtonGroup>
				<Button
					text={lang.button.continue}
					onPress={() =>
						router.push({
							pathname: '/auth/join-group',
							params: { index: 2, title: lang.auth.joinGroup.title, description: lang.auth.joinGroup.description },
						})
					}
				/>
			</ButtonGroup>
		</FormContainer>
	);
};

export default UploadPhoto;
