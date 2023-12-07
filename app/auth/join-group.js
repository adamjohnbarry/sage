import { Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { Link, useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { collection, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';

const JoinGroup = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [inviteWord, setInviteWord] = useState('');

	const [inviteWordError, setInviteWordError] = useState('');

	// error handling and invite word field updating on text change
	const inviteWordFieldChangeText = (text) => {
		if (text.length == 0) {
			setInviteWordError(lang.error.nameEmpty);
		} else {
			setInviteWordError('');
		}

		setInviteWord(text);
	};

	// handle joining a group if join button is selected
	const joinGroup = async () => {
		const db = getFirestore();

		const gardenRef = collection(db, 'gardens');

		const containsGarden = query(gardenRef, where('inviteWord', '==', inviteWord.toLowerCase()));
		const gardens = await getDocs(containsGarden);

		let garden;

		// retreive garden that matches invite word
		gardens.forEach((gardenObj) => {
			garden = gardenObj.data();
		});

		if (inviteWord.length == 0) {
			setInviteWordError(lang.error.inviteWordLengthError);
		} else if (!garden) {
			setInviteWordError(lang.error.inviteWordDoesntExistError);
		} else {
			// router.replace({
			// 	pathname: '/home/my-garden',
			// 	params: { title: lang.myGarden.myGarden.title, description: lang.myGarden.myGarden.description },
			// });
		}
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.inviteWord.label}</Text>
						<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={inviteWordFieldChangeText} />
						{inviteWordError && <Text style={globalStyles.formError}>{inviteWordError}</Text>}
						<View style={globalStyles.formHelpContainer}>
							<Link href='/auth/how-do-i-get-an-invite-word' style={globalStyles.formHelp}>
								{lang.form.inviteWord.help}
							</Link>
						</View>
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button
						text={lang.button.createGroup}
						color='white'
						onPress={() =>
							router.push({
								pathname: '/auth/create-group',
								params: { index: 3, title: lang.createGroup.createGroup.title, description: lang.createGroup.createGroup.description },
							})
						}
					/>
					<Button
						text={lang.button.join}
						color={inviteWord.length > 0 ? 'black' : 'grey'}
						disabled={inviteWord.length == 0 ? true : false}
						onPress={joinGroup}
					/>
				</View>
			</View>
		</View>
	);
};

export default JoinGroup;
