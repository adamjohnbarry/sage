import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import PhoneInput from 'react-native-phone-input';
import validator from 'validator';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { useUser } from '../../assets/contexts/UserContext';

const UploadNumber = () => {
	const router = useRouter();
	const { user, setUser } = useUser();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [phoneNumberError, setPhoneNumberError] = useState('');

	// error handling and phone number field updating on number change
	const phoneNumberChangeNumber = (number) => {
		if (!validator.isMobilePhone(number)) {
			setPhoneNumberError(lang.error.validPhoneNumber);
		} else {
			setPhoneNumberError('');
		}

		setPhoneNumber(number);
	};

	// update account with name and phone number
	const updatePhoneNumber = async (e) => {
		e.preventDefault();

		if (phoneNumberError) {
			console.log(lang.error.phoneNumberUploadError);
		} else {
			setUser({ ...user, phoneNumber })
			router.push({
				pathname: '/auth/upload-photo',
				params: { index: 1, title: lang.auth.register.title, description: lang.auth.register.description },
			});
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
