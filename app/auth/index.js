import { Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import validator from 'validator';
import { useRouter } from 'expo-router';
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

	// error handling and email field updating on text change
	const emailFieldChangeText = (text) => {
		if (!validator.isEmail(text)) {
			setEmailError(lang.error.emailFormat);
		} else {
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
			setPasswordError(lang.error.passwordLength);
		} else {
			setPasswordError('');
		}

		setPassword(text);
	};

	// error handling and cofirm password field updating on text change
	const confirmPasswordFieldChangeText = (text) => {
		if (text !== password) {
			setConfirmPasswordError(lang.error.passwordMatching);
		} else {
			setConfirmPasswordError('');
		}

		setConfirmPassword(text);
	};


	// create account with given user credentials
	const createAccount = async (e) => {
		e.preventDefault();

		if (emailError || passwordError || confirmPasswordError) {
			console.log(lang.error.userRegistration);
			return;
		} else {
			console.log(email, password)
			setUser((currentUser) => ({
				...currentUser,
				email,
				password,
			}));
			console.log('user below ...');
			console.log({
				...user,
				email,
				password,
			})
			const success = await createUserAccount(email, password);
			if (success) {
				router.push({
					pathname: '/auth/upload-name',
					params: { index: 1, title: lang.auth.register.title, description: lang.auth.register.description },
				});
			} else {
				console.log(lang.error.userRegistration);
			}
		}
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.email.label}</Text>
						<FormInputText placeholder={lang.form.email.placeholder} keyboardType='email-address' value={email} onChangeText={emailFieldChangeText} />
						{emailError && <Text style={globalStyles.formError}>{emailError}</Text>}
					</View>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.passwordRegistration.label}</Text>
						<FormInputText
							placeholder={lang.form.passwordRegistration.placeholder}
							value={password}
							secureTextEntry={true}
							onChangeText={passwordFieldChangeText}
						/>
						{passwordError && <Text style={globalStyles.formError}>{passwordError}</Text>}
					</View>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.confirmPassword.label}</Text>
						<FormInputText
							placeholder={lang.form.confirmPassword.placeholder}
							value={confirmPassword}
							secureTextEntry={true}
							onChangeText={confirmPasswordFieldChangeText}
						/>
						{confirmPasswordError && <Text style={globalStyles.formError}>{confirmPasswordError}</Text>}
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.continue} onPress={createAccount} />
				</View>
			</View>
		</View>
	);
};

export default Register;
