import { Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const NameGarden = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [gardenName, setGardenName] = useState('');
	const [inviteWord, setInviteWord] = useState('');

	const createNewGarden = async () => {
		const auth = getAuth();
		const db = getFirestore();

		const userRef = doc(db, 'users', auth.currentUser.uid);
		const user = await getDoc(userRef);

		try {
			await addDoc(collection(db, 'gardens'), {
				name: gardenName,
				inviteWord: inviteWord.toLowerCase(),
				members: [
					{
						name: user.data().name,
						phoneNumber: user.data().phoneNumber,
					},
				],
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
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.gardenName.label}</Text>
						<FormInputText placeholder={lang.form.gardenName.placeholder} value={gardenName} onChangeText={(text) => setGardenName(text)} />
					</View>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.inviteWord.label}</Text>
						<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={(text) => setInviteWord(text)} />
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
