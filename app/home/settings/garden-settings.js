import { Text, View } from 'react-native';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/contexts';
import FormInputText from '../../../assets/components/FormInputText';
import Button from '../../../assets/components/Button';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const GardenSettings = () => {
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [gardenName, setGardenName] = useState('');
	const [inviteWord, setInviteWord] = useState('');

	// pre populate the garden settings fields
	useEffect(() => {
		const auth = getAuth();
		const db = getFirestore();

		const userRef = doc(db, 'users', auth.currentUser.uid);

		const getGardenDetails = async () => {
			const user = await getDoc(userRef);

			const gardenRef = doc(db, 'gardens', user.data().gardenId);
			const garden = await getDoc(gardenRef);

			return garden;
		};

		getGardenDetails()
			.then((garden) => {
				setGardenName(garden.data().name);
				setInviteWord(garden.data().inviteWord);
			})
			.catch((err) => {
				console.log(`${err.code}: ${err.message}`);
			});
	}, []);

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
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
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.groupMembers.label}</Text>
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.save} color='green' />
				</View>
			</View>
		</View>
	);
};

export default GardenSettings;
