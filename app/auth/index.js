import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import validator from 'validator';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import Form from '../../assets/components/Form';
import FormContainer from '../../assets/components/FormContainer';
import FormGroup from '../../assets/components/FormGroup';
import FormInputText from '../../assets/components/FormInputText';
import PressOutsideInput from '../../assets/components/PressOutsideInput';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';

const Register = () => {
	const router = useRouter();
	const { user, setUser, createUserAccount } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

	// error handling and email field updating on text change
	const emailFieldChangeText = (text) => {
		if (!validator.isEmail(text)) {
			setIsEmailValid(false);
			setEmailError(lang.error.emailFormat);
		} else {
			setIsEmailValid(true);
			setEmailError('');
		}

		setEmail(text);
	};

	// error handling and password field updating on text change
	const passwordFieldChangeText = (text) => {
		if (
			!validator.isStrongPassword(text, {
				minLength: 8,
				minLowercase: 0,
				minUppercase: 0,
				minNumbers: 0,
				minSymbols: 0,
				returnScore: false,
			})
		) {
			setIsPasswordValid(false);
			setPasswordError(lang.error.passwordLength);
		} else {
			setIsPasswordValid(true);
			setPasswordError('');
		}

		setPassword(text);
	};

	// error handling and cofirm password field updating on text change
	const confirmPasswordFieldChangeText = (text) => {
		if (text !== password) {
			setIsConfirmPasswordValid(false);
			setConfirmPasswordError(lang.error.passwordMatching);
		} else {
			setIsConfirmPasswordValid(true);
			setConfirmPasswordError('');
		}

		setConfirmPassword(text);
	};

	// create account with given user credentials
	const createAccount = async (e) => {
		e.preventDefault();

		if (!isEmailValid) {
			setEmailError(lang.error.emailFormat);
		} else if (!isPasswordValid) {
			setPasswordError(lang.error.passwordLength);
		} else if (!isConfirmPasswordValid) {
			setConfirmPasswordError(lang.error.passwordMatching);
		} else {
			setUser((currentUser) => ({
				...currentUser,
				email,
				password,
			}));

			let success;

			try {
				success = await createUserAccount(email, password);
			} catch (err) {
				setEmailError(lang.error.emailExistsError);
			}

			// if we successfully created the user's account
			if (success) {
				router.push({
					pathname: '/auth/upload-name',
					params: { index: 1, title: lang.auth.register.title, description: lang.auth.register.description },
				});
			}
		}
	};

	return (
		<PressOutsideInput>
			<FormContainer safeArea={safeArea}>
				<Form>
					<FormGroup label={lang.form.email.label} error={emailError}>
						<FormInputText placeholder={lang.form.email.placeholder} keyboardType='email-address' value={email} onChangeText={emailFieldChangeText} />
					</FormGroup>
					<FormGroup label={lang.form.passwordRegistration.label} error={passwordError}>
						<FormInputText
							placeholder={lang.form.passwordRegistration.placeholder}
							value={password}
							secureTextEntry={true}
							onChangeText={passwordFieldChangeText}
						/>
					</FormGroup>
					<FormGroup label={lang.form.confirmPassword.label} error={confirmPasswordError}>
						<FormInputText
							placeholder={lang.form.confirmPassword.placeholder}
							value={confirmPassword}
							secureTextEntry={true}
							onChangeText={confirmPasswordFieldChangeText}
						/>
					</FormGroup>
				</Form>
				<ButtonGroup>
					<Button
						text={lang.button.continue}
						color={isEmailValid && isPasswordValid && isConfirmPasswordValid ? 'black' : 'grey'}
						disabled={isEmailValid && isPasswordValid && isConfirmPasswordValid ? false : true}
						onPress={createAccount}
					/>
				</ButtonGroup>
			</FormContainer>
		</PressOutsideInput>
	);
};

export default Register;
