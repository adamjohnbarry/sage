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

const DEFAULT_PHOTO =
	'https://i.seadn.io/gae/y2QcxTcchVVdUGZITQpr6z96TXYOV0p3ueLL_1kIPl7s-hHn3-nh8hamBDj0GAUNAndJ9_Yuo2OzYG5Nic_hNicPq37npZ93T5Nk-A?auto=format&dpr=1&w=1000';

const UploadPhoto = () => {
	const router = useRouter();
	const { updateUserPhoto } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [photo, setPhoto] = useState(DEFAULT_PHOTO);
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

	// save photo
	const savePhoto = () => {
		if (!photoUploaded) {
			updateUserPhoto(DEFAULT_PHOTO);
		}

		router.push({
			pathname: '/auth/join-group',
			params: { index: 2, title: lang.auth.joinGroup.title, description: lang.auth.joinGroup.description },
		});
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
				<Button text={lang.button.continue} onPress={savePhoto} />
			</ButtonGroup>
		</FormContainer>
	);
};

export default UploadPhoto;
