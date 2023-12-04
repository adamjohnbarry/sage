import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import PhoneInput from 'react-native-phone-input';
import validator from 'validator';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

const UploadNumber = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [phoneNumber, setPhoneNumber] = useState('');
	const [phoneNumberError, setPhoneNumberError] = useState('');

	// error handling and phone number field updating on number change
	const phoneNumberChangeNumber = (number) => {
		if (!validator.isMobilePhone(number)) {
			setPhoneNumberError('Please enter a valid phone number.');
		} else {
			setPhoneNumberError('');
		}

		setPhoneNumber(number);
	};

	// update account with name and phone number
	const updatePhoneNumber = async (e) => {
		e.preventDefault();

		if (phoneNumberError) {
			console.log("Could not update user's number.");
		} else {
			const auth = getAuth();
			const db = getFirestore();

			const userRef = doc(db, 'users', auth.currentUser.uid);

			try {
				await updateDoc(userRef, {
					phoneNumber,
				});

				router.push({
					pathname: '/auth/upload-photo',
					params: { index: 1, title: lang.auth.register.title, description: lang.auth.register.description },
				});
			} catch (err) {
				console.log(`${err.code}: ${err.message}`);
			}
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
				<View style={globalStyles.formContainer}>
					<View style={globalStyles.form}>
						<View style={globalStyles.formGroup}>
							<Text style={globalStyles.formLabel}>{lang.form.phoneNumber.label}</Text>
							<PhoneInput value={phoneNumber} defaultCountry='us' onChangePhoneNumber={phoneNumberChangeNumber} style={globalStyles.formInput} />
							{phoneNumberError && <Text style={globalStyles.formError}>{phoneNumberError}</Text>}
						</View>
					</View>
					<View style={globalStyles.buttonGroup}>
						<Button text={lang.button.continue} onPress={updatePhoneNumber} />
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default UploadNumber;
