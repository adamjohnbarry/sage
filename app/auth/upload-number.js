import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import PhoneInput from 'react-native-phone-input';
import validator from 'validator';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import Form from '../../assets/components/Form';
import FormContainer from '../../assets/components/FormContainer';
import FormGroup from '../../assets/components/FormGroup';
import PressOutsideInput from '../../assets/components/PressOutsideInput';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';
import globalStyles from '../../assets/styles/GlobalStyles';

const UploadNumber = () => {
	const router = useRouter();
	const { user, setUser } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

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
		} else if (!phoneNumber) {
			setPhoneNumberError(lang.error.numberEmptyError);
		} else {
			setUser({ ...user, phoneNumber });

			router.push({
				pathname: '/auth/upload-photo',
				params: { index: 1, title: lang.auth.register.title, description: lang.auth.register.description },
			});
		}
	};

	return (
		<PressOutsideInput>
			<FormContainer safeArea={safeArea}>
				<Form>
					<FormGroup label={lang.form.phoneNumber.label} error={phoneNumberError}>
						<PhoneInput value={phoneNumber} onChangePhoneNumber={phoneNumberChangeNumber} style={globalStyles.formInput} />
					</FormGroup>
				</Form>
				<ButtonGroup>
					<Button text={lang.button.continue} onPress={updatePhoneNumber} />
				</ButtonGroup>
			</FormContainer>
		</PressOutsideInput>
	);
};

export default UploadNumber;
