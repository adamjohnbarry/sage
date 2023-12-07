import { Text, View } from 'react-native';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/contexts';
import FormInputText from '../../../assets/components/FormInputText';
import Button from '../../../assets/components/Button';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const AccountSettings = () => {
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [name, setName] = useState('');

	// pre populate the account settings fields
	useEffect(() => {
		const auth = getAuth();
		const db = getFirestore();

		const userRef = doc(db, 'users', auth.currentUser.uid);

		const getUserDetails = async () => {
			const user = await getDoc(userRef);

			return user;
		};

		getUserDetails()
			.then((user) => {
				setName(user.data().name);
			})
			.catch((err) => {
				console.log(`${err.code}: ${err.message}`);
			});
	}, []);

	// handle saving account details
	const saveAccountDetails = () => {};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.name.label}</Text>
						<FormInputText placeholder={lang.form.name.placeholder} value={name} onChangeText={(text) => setName(text)} />
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.save} color='green' onPress={saveAccountDetails} />
				</View>
			</View>
		</View>
	);
};

export default AccountSettings;
