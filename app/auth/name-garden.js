import { Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const NameGarden = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [gardenName, setGardenName] = useState('');
	const [inviteWord, setInviteWord] = useState('');

	const [gardenNameError, setGardenNameError] = useState('');
	const [inviteWordError, setInviteWordError] = useState('');

	// error handling and garden name field updating on text change
	const gardenNameFieldChangeText = (text) => {
		if (text.length == 0) {
			setGardenNameError(lang.error.gardenNameEmpty);
		} else {
			setGardenNameError('');
		}

		setGardenName(text);
	};

	const createNewGarden = async () => {
		const auth = getAuth();
		const db = getFirestore();

		const userRef = doc(db, 'users', auth.currentUser.uid);
		const user = await getDoc(userRef);

		const gardenRef = collection(db, 'gardens');

		const containsGarden = query(gardenRef, where('inviteWord', '==', inviteWord.toLowerCase()));
		const gardens = await getDocs(containsGarden);

		let garden;

		// retreive garden that matches invite word
		gardens.forEach((gardenObj) => {
			garden = gardenObj.data();
		});

		// invite word already exists do nothing
		if (garden) {
			setInviteWordError(lang.error.inviteWordAlreadyExistsError);
		} else {
			try {
				await addDoc(collection(db, 'gardens'), {
					name: gardenName,
					inviteWord: inviteWord.toLowerCase(),
					members: [user.id],
				})
					.then(async (gardenRef) => {
						await updateDoc(userRef, {
							gardenId: gardenRef.id,
						});
					})
					.catch((err) => {
						console.log(`${err.code}: ${err.message}`);
					});
			} catch (err) {
				console.log(`${err.code}: ${err.message}`);
			}

			router.push({
				pathname: '/auth/choose-location',
				params: { index: 5, title: lang.createGroup.chooseLocation.title, description: lang.createGroup.chooseLocation.description },
			});
		}
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.gardenName.label}</Text>
						<FormInputText placeholder={lang.form.gardenName.placeholder} value={gardenName} onChangeText={gardenNameFieldChangeText} />
						{gardenNameError && <Text style={globalStyles.formError}>{gardenNameError}</Text>}
					</View>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.inviteWord.label}</Text>
						<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={(text) => setInviteWord(text)} />
						{inviteWordError && <Text style={globalStyles.formError}>{inviteWordError}</Text>}
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.continue} onPress={createNewGarden} />
				</View>
			</View>
		</View>
	);
};

export default NameGarden;
