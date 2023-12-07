import { Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';

const UploadName = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [name, setName] = useState('');

	const [nameError, setNameError] = useState('');

	// error handling and name field updating on text change
	const nameFieldChangeText = (text) => {
		if (text.length == 0) {
			setNameError(lang.error.nameEmpty);
		} else {
			setNameError('');
		}

		setName(text);
	};

	// update account with name
	const updateDisplayName = async (e) => {
		e.preventDefault();

		if (nameError) {
			console.log(lang.error.nameUploadError);
		} else {
			const auth = getAuth();
			const db = getFirestore();

			const userRef = doc(db, 'users', auth.currentUser.uid);

			try {
				await updateDoc(userRef, {
					name,
				});

				router.push({
					pathname: '/auth/upload-number',
					params: { index: 1, title: lang.auth.register.title, description: lang.auth.register.description },
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
						<Text style={globalStyles.formLabel}>{lang.form.name.label}</Text>
						<FormInputText placeholder={lang.form.name.placeholder} value={name} onChangeText={nameFieldChangeText} />
						{nameError && <Text style={globalStyles.formError}>{nameError}</Text>}
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.continue} onPress={updateDisplayName} />
				</View>
			</View>
		</View>
	);
};

export default UploadName;
